// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlocFi is Ownable {
    mapping(uint => Institution) public institutions;
    mapping(uint => Candidate) public candidates;
    mapping(uint => Credential) private credentials;

    mapping(bytes => mapping(uint => bytes)) public hashes;

    mapping(address => bool) private admins;

    bool public emergenceShutdown = false;

    // mapping (uint => Experience)  public experiences;
    // mapping (uint => mapping (uint => Experience)) public userExperiences;
    // mapping (uint => Skill)  public skills;
    // mapping (uint => mapping (uint => Skill)) public userSkills;
    // mapping (uint => Certificate)  public certificates;
    // mapping (uint => mapping (uint => Certificate)) public userCertificates;
    // mapping (uint => Endorsment)  public endorsements;
    // mapping (uint => mapping (uint => Endorsment)) public userEndorsements;

    uint public institutionIds = 1;
    uint public candidatesId = 1;
    uint public credentialId = 1;
    uint public no_of_admins = 0;

    // uint public experienceIds = 0;
    // uint public skillIds = 0;
    // uint public cerificateIds = 0;
    // uint public endorsementIds = 0;

    enum CredentialType {
        Certificate,
        Diploma,
        ID_CARD
    }

    mapping(address => uint) institution_to_id;
    mapping(address => uint) candidate_to_id;
    mapping(uint => mapping(uint => Credential)) public candidates_credential;
    mapping(uint => mapping(uint => Credential)) public institution_credential;
    // mapping (address => uint) skill_to_id;
    // mapping (address => uint) certificate_to_id;
    // mapping (address => uint) endorsement_to_id;

    struct Candidate {
        string name;
        string profile_uri;
        bool is_verified;
        uint no_of_credentials;
        bool created;
    }

    struct Institution {
        string name;
        string website;
        bool created;
        bool verified;
    }

    // struct Experience {
    //     uint starting_date;
    //     uint ending_date;
    //     string role;
    //     bool currently_working;
    //     bool is_approved;
    // }

    // struct Skill {
    //     string name;
    //     bool verified;
    //     address verifiedBy;
    // }

    struct Credential {
        uint issue_date;
        string cid;
        bytes _hash;
        CredentialType credentialType;
        uint issuer;
        bool verified;
        bool created;
    }

    // struct Endorsment {
    //     uint date;
    //     string comment;
    //     address _from;
    // }

    enum idTypes {
        Can,
        Comp,
        Cred
    }

    event InstitutionAdded(address indexed _creator, uint _id);
    event CandidateAdded(address indexed _user, uint _id);

    constructor() {}

    function _setAdmin(
        address admin,
        bool add
    ) external checkAddress0(admin) check_system_status onlyOwner {
        admins[admin] = add;
        no_of_admins++;
    }

    function addInstitution(
        string calldata _name,
        string calldata _website
    ) external check_system_status checkAddress0(_msgSender()) {
        require(
            resolveId(_msgSender(), idTypes.Comp) <= 0,
            "BlocFi: Address already creator of a company"
        );
        Institution memory newInstitution = Institution(
            _name,
            _website,
            true,
            false
        );
        institutions[institutionIds] = newInstitution;
        institution_to_id[_msgSender()] = institutionIds;
        institutionIds += 1;
        emit InstitutionAdded(_msgSender(), institutionIds - 1);
    }

    function addCandidate(
        string calldata _name,
        string calldata _profile_url
    ) external check_system_status checkAddress0(_msgSender()) {
        require(
            resolveId(_msgSender(), idTypes.Can) <= 0,
            "BlocFi: Account Found!"
        );
        Candidate memory newCandidate = Candidate(
            _name,
            _profile_url,
            false,
            0,
            true
        );
        candidates[candidatesId] = newCandidate;
        candidate_to_id[_msgSender()] = candidatesId;
        candidatesId += 1;
        emit CandidateAdded(_msgSender(), candidatesId - 1);
    }

    // function addExperience(uint _start, uint _end, bool _currently_working, string calldata _role) external {
    //     Experience memory newExp = Experience(_start, _end, _role, _currently_working, false);
    // }

    function addCredential(
        string memory credential_no,
        string calldata cid,
        uint issue_timestamp,
        uint16 credential_type,
        uint _issuer
    )
        external
        check_candidate
        check_system_status
        check_if_institution_created(_issuer)
    {
        uint user_id = resolveId(_msgSender(), idTypes.Can);
        Candidate storage _candidate = candidates[user_id];
        CredentialType _type = resolveCredentialType(credential_type);
        bytes memory _hash = hashCredential(cid, credential_no, credentialId);
        Credential memory newCred = Credential(
            issue_timestamp,
            cid,
            _hash,
            _type,
            _issuer,
            false,
            true
        );
        credentials[credentialId] = newCred;
        candidates_credential[user_id][credentialId] = newCred;
        institution_credential[_issuer][credentialId] = newCred;

        credentialId += 1;
        _candidate.no_of_credentials += 1;
    }

    function verifyCredential(
        uint credential_id
    ) external check_system_status onlyOwner {
        Credential storage credential = credentials[credential_id];
        credential.verified = true;
    }

    function resolveId(
        address pointer,
        idTypes _type
    ) internal view returns (uint) {
        if (_type == idTypes.Can) {
            return candidate_to_id[pointer];
        } else if (_type == idTypes.Comp) {
            return institution_to_id[pointer];
        } else {
            return 0;
        }
    }

    function resolveCredentialType(
        uint16 _type
    ) internal pure returns (CredentialType) {
        if (_type == 1) {
            return CredentialType.Certificate;
        } else if (_type == 2) {
            return CredentialType.Diploma;
        } else {
            return CredentialType.ID_CARD;
        }
    }

    function getInstitution(
        address _owner
    ) external view returns (Institution memory) {
        uint _id = resolveId(_owner, idTypes.Comp);
        return institutions[_id];
    }

    function getCandidate(
        address _user
    ) external view returns (Candidate memory) {
        uint _id = resolveId(_user, idTypes.Can);
        return candidates[_id];
    }

    function manageAccount(
        address _owner,
        bool status
    ) external canVerifyAccount {
        uint user_id = resolveId(_owner, idTypes.Can);
        Candidate storage _can = candidates[user_id];
        _can.is_verified = status;
    }

    function manageShutdown(bool status) external onlyOwner {
        emergenceShutdown = status;
    }

    // function getExperience(address _user) external view returns (Experience memory){
    //     uint _id = resolveId(_user, idTypes.Exp);
    //     return experiences[_id];
    // }

    // function getSkill(address _user) external view returns (Skill memory){
    //     uint _id = resolveId(_user, idTypes.Skill);
    //     return skills[_id];
    // }

    // function getEndorsement(address _user) external view returns (Endorsment memory){
    //     uint _id = resolveId(_user, idTypes.Endorse);
    //     return endorsements[_id];
    // }

    function _resolveCredential(
        uint _id
    ) internal view returns (Credential memory) {
        return credentials[_id];
    }

    function getCredential(
        uint _credentialId
    ) external view returns (Credential memory, string memory _credential_no) {
        Credential memory _credential = credentials[_credentialId];
        string memory _credentialNo = retrieveCredentialNo(
            _credentialId,
            _credential.cid
        );
        return (_credential, _credentialNo);
    }

    function getAdmin(address _address) external view onlyOwner returns (bool) {
        return admins[_address];
    }

    modifier checkAddress0(address _address) {
        require(_address != address(0), "BlocFi: Invalid wallet address");
        _;
    }
    modifier check_candidate() {
        uint user_id = resolveId(_msgSender(), idTypes.Can);
        require(user_id > 0, "BlocFi: Account not found!");
        Candidate memory _candidate = candidates[user_id];
        require(_candidate.is_verified, "BlocFi: Account not Verified!");
        _;
    }

    modifier check_institution(address _address) {
        require(
            resolveId(_address, idTypes.Comp) > 0,
            "BlocFi: Invalid Institution!"
        );
        _;
    }

    modifier check_if_institution_created(uint _id) {
        Institution storage _institution = institutions[_id];
        require(_institution.created, "BlocFi: Invalid Institution");
        _;
    }

    modifier check_system_status() {
        require(!emergenceShutdown, "BlocFi: System on Emergency shotdown");
        _;
    }

    modifier canVerifyAccount() {
        require(
            admins[_msgSender()] || owner() == _msgSender(),
            "BlocFi: Can't verify account"
        );
        _;
    }

    function hashCredential(
        string memory _cid,
        string memory credential_no,
        uint _credential_id
    ) internal returns (bytes memory) {
        bytes memory _hash_value = abi.encode(credential_no);
        bytes memory hash_key = abi.encode(_cid);
        hashes[hash_key][_credential_id] = _hash_value;
        return _hash_value;
    }

    function retrieveCredentialNo(
        uint _credential_id,
        string memory _cid
    ) public view returns (string memory) {
        bytes memory hash_key = abi.encode(_cid);
        bytes memory _cid_hash = hashes[hash_key][_credential_id];
        string memory _credential_no = abi.decode(_cid_hash, (string));
        return _credential_no;
    }
}
