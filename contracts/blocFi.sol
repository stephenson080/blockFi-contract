// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BlocFi is Ownable {
    mapping (uint => Company)  public companies;
    mapping (uint => Employee) public employees;
    mapping (uint => mapping (uint => Employee)) public companyEmployees;

    mapping (uint => Experience)  public experiences;
    mapping (uint => mapping (uint => Experience)) public userExperiences;
    mapping (uint => Skill)  public skills;
    mapping (uint => mapping (uint => Skill)) public userSkills;
    mapping (uint => Certificate)  public certificates;
    mapping (uint => mapping (uint => Certificate)) public userCertificates;
    mapping (uint => Endorsment)  public endorsements;
    mapping (uint => mapping (uint => Endorsment)) public userEndorsements;

    uint public companyIds = 0;
    uint public userIds = 0;
    uint public experienceIds = 0;
    uint public skillIds = 0;
    uint public cerificateIds = 0;
    uint public endorsementIds = 0;
    
    mapping (address => uint) company_to_id;
    mapping (address => uint) user_to_id;
    mapping (address => uint) experience_to_id;
    mapping (address => uint) skill_to_id;
    mapping (address => uint) certificate_to_id;
    mapping (address => uint) endorsement_to_id;

    struct Employee {
        string name;
        string profile_uri;
        bool is_employed;
    }

    struct Company {
        string name;
        string website;
        bool isVerified;
    }

    struct Experience {
        uint starting_date;
        uint ending_date;
        string role;
        bool currently_working;
        bool is_approved;
    }

    struct Skill {
        string name;
        bool verified;
        address verifiedBy;
    }

     struct Certificate {
        string url;
        uint issue_date;
        // uint valid_till;
        string name;
        string issuer;
    }

    struct Endorsment {
        uint date;
        string comment;
        address _from;
    }

    enum idTypes { User, Comp, Skill, Exp, Endorse, Cert}

    event CompanyAdded(address indexed _creator, uint _id);
    event UserAdded(address indexed _user, uint _id);

    constructor(){

    }

    function addCompany(string calldata _name, string calldata _website) external {
        require(resolveId(msg.sender, idTypes.Comp) <= 0, "BlocFi: Address already creator of a company");
        Company memory newCompany = Company(_name, _website, false);
        companies[companyIds] = newCompany;
        company_to_id[msg.sender] = companyIds;
        companyIds += 1;
        emit CompanyAdded(msg.sender, companyIds);
    }

    function addUser(string calldata _name, string calldata _profile_url, bool _isEmployed) external {
        require(resolveId(msg.sender, idTypes.User) <= 0, "BlocFi: Account Found!");
        Employee memory newEmployee = Employee(_name, _profile_url, _isEmployed);
        employees[userIds] = newEmployee;
        user_to_id[msg.sender] = userIds;
        userIds += 1;
        emit UserAdded(msg.sender, userIds);
    }

    function addExperience(uint _start, uint _end, bool _currently_working, string calldata _role) external {
        Experience memory newExp = Experience(_start, _end, _role, _currently_working, false)
    }

    function addCertificate(string calldata _name, string calldata _issuer, string calldata _url) external {
        Certificate memory newCert = Certificate(_url, block.timestamp,  _name, _issuer);
        certificates[cerificateIds] = newCert;
        certificate_to_id[msg.sender] = cerificateIds;
        cerificateIds += 1;
    }

    function resolveId(address pointer, idTypes _type) internal view returns(uint){
        if (_type == idTypes.User){
            return user_to_id[pointer];
        }
        else if (_type == idTypes.Comp){
            return company_to_id[pointer];
        }
        else if (_type == idTypes.Cert){
            return certificate_to_id[pointer];
        }
        if (_type == idTypes.Endorse){
            return endorsement_to_id[pointer];
        }
        else if (_type == idTypes.Exp){
            return experience_to_id[pointer];
        }
        else if (_type == idTypes.Skill){
            return skill_to_id[pointer];
        }
        else {
            return 0;
        }
    }

    function getCompany(address _owner) external view returns (Company memory){
        uint _id = resolveId(_owner, idTypes.Comp);
        return companies[_id];
    }

    function getUser(address _user) external view returns (Employee memory){
        uint _id = resolveId(_user, idTypes.User);
        return employees[_id];
    }

    function getExperience(address _user) external view returns (Experience memory){
        uint _id = resolveId(_user, idTypes.Exp);
        return experiences[_id];
    }

    function getSkill(address _user) external view returns (Skill memory){
        uint _id = resolveId(_user, idTypes.Skill);
        return skills[_id];
    }

    function getEndorsement(address _user) external view returns (Endorsment memory){
        uint _id = resolveId(_user, idTypes.Endorse);
        return endorsements[_id];
    }

    function getCertificate(address _user) external view returns (Certificate memory){
        uint _id = resolveId(_user, idTypes.Cert);
        return certificates[_id];
    }
}
