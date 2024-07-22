const { network } = require("hardhat");
const {
    networkconfig,
    developmentChains,
} = require("../hardhat-config-helper");
require("dotenv").config();
const { verify } = require("../utility/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;
    let TestContract;
    log('chainId:' + chainId)
    log(deployer)
    log("Deploying ChainlinkVRFTest Contract...");

    ChainlinkVRFTest = await deploy("ChainlinkVRFTest", {
        contract: "ChainlinkVRFTest",
        from: deployer,
        log: true,
        args: [process.env.SubscriptionId,process.env.VRFCoordinator],
        waitConfirmations: network.config.blockConfirmations || 1,
    });


    log("------------------------------------------------");
    log(`ChainlinkVRFTest deployed at ${ChainlinkVRFTest.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ChainlinkVRFTest.address, [process.env.SubscriptionId,process.env.VRFCoordinator]);
    }
};
module.exports.tags = ["all", "ChainlinkVRFTest"];
