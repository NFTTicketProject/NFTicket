# 솔리디티
#### 설치

    npm init
    npm install @openzeppelin/contracts

#### 사용법

    # 선언
    import "@openzeppelin/contracts/token/[Protocol]/[Contract Name].sol"

    # 상속
    contract MyNFT is [Contract Name] {}

    # 생성자
    constructor() [Contract Name]([Token Name], [Token Symbol]) public {}

#### 예제

    import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol"

    contract TicketFactory is ERC721Full, ERC721Mintable {
        ...
        constructor() ERC721Full("MyTicket", "MTKT") public {
        
        }
        ...
    }

# 개념
## 접근 제어 (Access Control)

조폐 권한, 투표 권한, 전송 권한 등을 제어하여 시스템을 훔치지 못하도록 하는 것
    
### 소유권 기반 접근 제어

**Ownable** Contract와 **onlyOwner** Modifier를 이용하여 접근을 제어함

    # 선언
    import "@openzeppelin/contracts/ownership/Ownable.sol"

    # 상속
    contract MyNFT is Ownable {}

    # Modifier 사용
    function onlyAdminFunction() public onlyOwner {}

#### 역할 기반 접근 제어 (RBAC)

**Roles** Contract와 **Roles.Role** Contract(?)를 이용하여 접근을 제어함

대부분의 소프트웨어 개발은 RBAC를 사용

    # 선언
    import "@openzeppelin/contracts/access/Roles.sol"
    
    # 사용
    contract MyNFT {
        using Roles for Roles.Role;
        ...

        # 역할 생성
        Roles.Role private _minters;

        ...
    }

    # 인가
    function mint(...) {
        require(_minters.has(msg.sender));
        ...
    }

- ERC20Mintable
MinterRole 사용 가능
- ERC20Pausable
PauserRole 사용 가능
- WhitelistCrowdsale
WhitelistAdminRole, WhitelistedRole 사용 가능
- MintedCrowdSale
???

## 토큰
### ERC20
생략

### ERC721

#### 예제

    # 선언
    import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol"
    import "@openzeppelin/contracts/drafts/Counters.sol"

    # 상속
    contract MyTicket is ERC721Full {
        using Counters for Counters.Counter;
        Counters.Counter private _tokenIds;
        
        # 생성자
        constructor() ERC721Full("MyTicket", "MTKT") public {}

        function mintTicket(address to, string memory tokenURI) public returns (uint256) {
            _tokenIds.increment();

            uint256 newTicketId = _tokenIds.current();
            _mint(to, newTicketId);
            _setTokenURI(newTicketId, tokenURI);

            return newTicketId;
        }
    }

#### 사용법

    # MyTicket.mintTicket(customerAddr, "https://game.example/item-id-8u5h2m.json")

#### TokenURI 내용

    {
        "name": "Thor's hammer",
        "description": "Mjölnir, the legendary hammer of the Norse god of thunder.",
        "image": "https://game.example/item-id-8u5h2m.png",
        "strength": 20
    }