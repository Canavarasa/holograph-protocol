HOLOGRAPH_LICENSE_HEADER

pragma solidity 0.8.11;

/// @title Holograph ERC-721 Non-Fungible Token Standard
/// @dev See https://holograph.network/standard/ERC-721
///  Note: the ERC-165 identifier for this interface is 0xFFFFFFFF.
interface HolographedERC721 {

    // event id = 1
    function bridgeIn(address _from, address _to, uint256 _tokenId, bytes calldata _data) external returns (bool success);

    // event id = 2
    function bridgeOut(address _from, address _to, uint256 _tokenId) external returns (bytes memory _data);


    // event id = 3
    function afterApprove(address _owner, address _to, uint256 _tokenId) external view returns (bool success);

    // event id = 4
    function beforeApprove(address _owner, address _to, uint256 _tokenId) external view returns (bool success);

    // event id = 5
    function afterApprovalAll(address _to, bool _approved) external view returns (bool success);

    // event id = 6
    function beforeApprovalAll(address _to, bool _approved) external view returns (bool success);

    // event id = 7
    function afterBurn(address _owner, uint256 _tokenId) external view returns (bool success);

    // event id = 8
    function beforeBurn(address _owner, uint256 _tokenId) external view returns (bool success);

    // event id = 9
    function afterMint() external view returns (bool success);

    // event id = 10
    function beforeMint() external view returns (bool success);

    // event id = 11
    function afterSafeTransfer(address _from, address _to, uint256 _tokenId, bytes calldata _data) external view returns (bool success);

    // event id = 12
    function beforeSafeTransfer(address _from, address _to, uint256 _tokenId, bytes calldata _data) external view returns (bool success);

    // event id = 13
    function afterTransfer(address _from, address _to, uint256 _tokenId, bytes calldata _data) external view returns (bool success);

    // event id = 14
    function beforeTransfer(address _from, address _to, uint256 _tokenId, bytes calldata _data) external view returns (bool success);

}
