export const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "CandidateAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "InstitutionAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "admin",
        type: "address",
      },
      {
        internalType: "bool",
        name: "add",
        type: "bool",
      },
    ],
    name: "_setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_profile_url",
        type: "string",
      },
    ],
    name: "addCandidate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "credential_no",
        type: "string",
      },
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "issue_timestamp",
        type: "uint256",
      },
      {
        internalType: "uint16",
        name: "credential_type",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "_issuer",
        type: "uint256",
      },
    ],
    name: "addCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_website",
        type: "string",
      },
    ],
    name: "addInstitution",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "profile_uri",
        type: "string",
      },
      {
        internalType: "bool",
        name: "is_verified",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "no_of_credentials",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "candidatesId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "candidates_credential",
    outputs: [
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "issue_date",
        type: "uint256",
      },
      {
        internalType: "enum BlocFi.CredentialType",
        name: "credentialType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "issuer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "owner",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "verified",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "credentialId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "credentialNo_id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "emergenceShutdown",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getCandidate",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "profile_uri",
            type: "string",
          },
          {
            internalType: "bool",
            name: "is_verified",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "no_of_credentials",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
        ],
        internalType: "struct BlocFi.Candidate",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_credentialId",
        type: "uint256",
      },
    ],
    name: "getCredential",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "issue_date",
            type: "uint256",
          },
          {
            internalType: "enum BlocFi.CredentialType",
            name: "credentialType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "issuer",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "owner",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "verified",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
        ],
        internalType: "struct BlocFi.Credential",
        name: "",
        type: "tuple",
      },
      {
        internalType: "string",
        name: "_credential_no",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    name: "getInstitution",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "website",
            type: "string",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "verified",
            type: "bool",
          },
        ],
        internalType: "struct BlocFi.Institution",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "hashes",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "institutionIds",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "institution_credential",
    outputs: [
      {
        internalType: "string",
        name: "cid",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "issue_date",
        type: "uint256",
      },
      {
        internalType: "enum BlocFi.CredentialType",
        name: "credentialType",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "issuer",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "owner",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "verified",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "created",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "institutions",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "website",
        type: "string",
      },
      {
        internalType: "bool",
        name: "created",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "verified",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "manageCandidateAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "manageInstitutionAccount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "status",
        type: "bool",
      },
    ],
    name: "manageShutdown",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "no_of_admins",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "pointer",
        type: "address",
      },
      {
        internalType: "enum BlocFi.idTypes",
        name: "_type",
        type: "uint8",
      },
    ],
    name: "resolveId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_credential_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_cid",
        type: "string",
      },
    ],
    name: "retrieveCredentialNo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "credentialNo",
        type: "string",
      },
    ],
    name: "verifyCredential",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "credentialNo",
        type: "string",
      },
    ],
    name: "viewCredential",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "cid",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "issue_date",
            type: "uint256",
          },
          {
            internalType: "enum BlocFi.CredentialType",
            name: "credentialType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "issuer",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "owner",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "verified",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "created",
            type: "bool",
          },
        ],
        internalType: "struct BlocFi.Credential",
        name: "",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
