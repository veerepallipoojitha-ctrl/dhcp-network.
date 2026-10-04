/*
============================================================
DHCP NETWORK SIMULATION
============================================================

DHCP PROCESS:

1. DHCP DISCOVER
2. DHCP OFFER
3. DHCP REQUEST
4. DHCP ACK

DHCP SERVER:

IP       : 192.168.1.2
Network  : 192.168.1.0/24
Gateway  : 192.168.1.1
DNS      : 8.8.8.8

POOL:

192.168.1.100 - 192.168.1.200

============================================================
*/


// ============================================================
// NETWORK DEVICES
// ============================================================

const client = {

    name: "Client-PC1",

    mac: "00:11:22:33:44:01",

    ip: null

};


const dhcpServer = {

    name: "DHCP-Server",

    ip: "192.168.1.2"

};


// ============================================================
// DHCP CONFIGURATION
// ============================================================

const dhcpConfig = {

    network: "192.168.1.0/24",

    subnetMask: "255.255.255.0",

    gateway: "192.168.1.1",

    dns: "8.8.8.8",

    poolStart: 100,

    poolEnd: 200

};


// ============================================================
// ASSIGNED IP
// ============================================================

const assignedIP =
    "192.168.1.100";


// ============================================================
// SIMULATION
// ============================================================

let currentStep = 0;

let started = false;

const totalSteps = 8;


// ============================================================
// HTML ELEMENTS
// ============================================================

const consoleBox =
    document.getElementById("console");

const progress =
    document.getElementById("progress");

const stepText =
    document.getElementById("stepText");


// ============================================================
// LOG MESSAGE
// ============================================================

function log(message, type = "") {

    const line =
        document.createElement("div");

    line.textContent =
        message;

    if (type) {

        line.classList.add(type);

    }

    consoleBox.appendChild(line);

    consoleBox.scrollTop =
        consoleBox.scrollHeight;

}


// ============================================================
// UPDATE PROGRESS
// ============================================================

function updateProgress() {

    const percentage =
        (currentStep / totalSteps) * 100;

    progress.style.width =
        percentage + "%";

}


// ============================================================
// UPDATE DHCP MESSAGE
// ============================================================

function updateMessage(

    messageType,
    mac,
    ip,
    server

) {

    document.getElementById("messageType")
        .textContent = messageType;

    document.getElementById("messageMAC")
        .textContent = mac;

    document.getElementById("offeredIP")
        .textContent = ip;

    document.getElementById("serverIP")
        .textContent = server;

}


// ============================================================
// ACTIVATE LINK
// ============================================================

function activateLine(id) {

    document
        .getElementById(id)
        .classList.add("active");

}


// ============================================================
// STEP 1
// ============================================================

function stepOne() {

    log(
        "==================================================",
        "info"
    );

    log(
        "STEP 1: Client starts DHCP process",
        "info"
    );

    log(
        "Client currently has no IP address."
    );

    log(
        `Client MAC: ${client.mac}`
    );

    log(
        "Client broadcasts DHCP Discover."
    );

    log(
        "Destination IP: 255.255.255.255"
    );

    log(
        "Destination MAC: FF:FF:FF:FF:FF:FF"
    );

    updateMessage(

        "DHCP DISCOVER",

        client.mac,

        "0.0.0.0",

        dhcpServer.ip

    );

    activateLine("line1");

    stepText.textContent =
        "Step 1: Client broadcasts DHCP Discover.";

}


// ============================================================
// STEP 2
// ============================================================

function stepTwo() {

    log(
        "STEP 2: Switch forwards DHCP Discover",
        "info"
    );

    log(
        "[SWITCH] DHCP Discover received on Fa0/1."
    );

    log(
        "[SWITCH] Broadcast frame is forwarded."
    );

    log(
        "[SWITCH] Frame reaches DHCP Server."
    );

    activateLine("line2");

    stepText.textContent =
        "Step 2: Switch forwards the DHCP broadcast.";

}


// ============================================================
// STEP 3
// ============================================================

function stepThree() {

    log(
        "STEP 3: DHCP Server sends DHCP Offer",
        "info"
    );

    log(
        `[DHCP SERVER] Available IP found: ${assignedIP}`,
        "success"
    );

    log(
        `[DHCP SERVER] Offering ${assignedIP} to client.`
    );

    updateMessage(

        "DHCP OFFER",

        client.mac,

        assignedIP,

        dhcpServer.ip

    );

    stepText.textContent =
        "Step 3: DHCP server offers an IP address.";

}


// ============================================================
// STEP 4
// ============================================================

function stepFour() {

    log(
        "STEP 4: Client sends DHCP Request",
        "info"
    );

    log(
        `[CLIENT] Requesting IP ${assignedIP}.`
    );

    log(
        "[CLIENT] DHCP Request is broadcast."
    );

    updateMessage(

        "DHCP REQUEST",

        client.mac,

        assignedIP,

        dhcpServer.ip

    );

    stepText.textContent =
        "Step 4: Client requests the offered IP.";

}


// ============================================================
// STEP 5
// ============================================================

function stepFive() {

    log(
        "STEP 5: DHCP Server processes request",
        "info"
    );

    log(
        "[DHCP SERVER] Request accepted."
    );

    log(
        "[DHCP SERVER] Creating DHCP lease."
    );

    log(
        `[DHCP SERVER] IP ${assignedIP} reserved for ${client.mac}.`,
        "success"
    );

    stepText.textContent =
        "Step 5: DHCP server creates a lease.";

}


// ============================================================
// STEP 6
// ============================================================

function stepSix() {

    log(
        "STEP 6: DHCP Server sends DHCP ACK",
        "info"
    );

    log(
        "[DHCP SERVER] DHCP ACK generated."
    );

    log(
        `[DHCP SERVER] IP Address: ${assignedIP}`
    );

    log(
        `Subnet Mask: ${dhcpConfig.subnetMask}`
    );

    log(
        `Default Gateway: ${dhcpConfig.gateway}`
    );

    log(
        `DNS Server: ${dhcpConfig.dns}`
    );

    updateMessage(

        "DHCP ACK",

        client.mac,

        assignedIP,

        dhcpServer.ip

    );

    stepText.textContent =
        "Step 6: Client receives DHCP ACK.";

}


// ============================================================
// STEP 7
// ============================================================

function stepSeven() {

    log(
        "STEP 7: Client configures network automatically",
        "info"
    );

    client.ip =
        assignedIP;

    document.getElementById("client1IP")
        .textContent =
        assignedIP;

    document.getElementById("assignedIP")
        .textContent =
        assignedIP;

    document.getElementById("assignedMask")
        .textContent =
        dhcpConfig.subnetMask;

    document.getElementById("assignedGateway")
        .textContent =
        dhcpConfig.gateway;

    document.getElementById("assignedDNS")
        .textContent =
        dhcpConfig.dns;


    log(
        `[CLIENT] IP Address = ${assignedIP}`,
        "success"
    );

    log(
        `[CLIENT] Subnet Mask = ${dhcpConfig.subnetMask}`
    );

    log(
        `[CLIENT] Gateway = ${dhcpConfig.gateway}`
    );

    log(
        `[CLIENT] DNS = ${dhcpConfig.dns}`
    );


    updateLeaseTable();


    stepText.textContent =
        "Step 7: Client has received automatic network configuration.";

}


// ============================================================
// STEP 8
// ============================================================

function stepEight() {

    log(
        "STEP 8: Connectivity test",
        "info"
    );

    log(
        `Pinging DHCP server ${dhcpServer.ip}...`
    );

    log(
        `Reply from ${dhcpServer.ip}: bytes=32 time<1ms TTL=64`,
        "success"
    );

    log(
        "DHCP network connectivity test successful.",
        "success"
    );


    const pingResult =
        document.getElementById("pingResult");

    pingResult.classList.add("success");

    pingResult.innerHTML = `

        DHCP configuration successful.

        <br><br>

        IP Address:
        ${assignedIP}

        <br>

        Gateway:
        ${dhcpConfig.gateway}

        <br>

        DNS:
        ${dhcpConfig.dns}

        <br><br>

        Reply from ${dhcpServer.ip}:
        bytes=32 time<1ms TTL=64

        <br><br>

        <strong>
        Result: SUCCESS
        </strong>

    `;


    // PASS TESTS

    for (let i = 1; i <= 6; i++) {

        passTest("test" + i);

    }


    stepText.textContent =
        "DHCP simulation completed successfully.";


    log(
        "==================================================",
        "success"
    );

    log(
        "DHCP NETWORK TEST PASSED",
        "success"
    );

}


// ============================================================
// UPDATE LEASE TABLE
// ============================================================

function updateLeaseTable() {

    const table =
        document.getElementById("leaseTable");

    table.innerHTML = `

        <tr>

            <td>
                ${client.mac}
            </td>

            <td>
                ${assignedIP}
            </td>

            <td>
                3600 seconds
            </td>

            <td>
                <strong class="lease-active">
                    ACTIVE
                </strong>
            </td>

        </tr>

    `;

}


// ============================================================
// PASS TEST
// ============================================================

function passTest(id) {

    const element =
        document.getElementById(id);

    element.textContent =
        "PASS";

    element.classList.add("pass");

}


// ============================================================
// EXECUTE STEP
// ============================================================

function executeStep() {

    currentStep++;

    updateProgress();

    switch (currentStep) {

        case 1:
            stepOne();
            break;

        case 2:
            stepTwo();
            break;

        case 3:
            stepThree();
            break;

        case 4:
            stepFour();
            break;

        case 5:
            stepFive();
            break;

        case 6:
            stepSix();
            break;

        case 7:
            stepSeven();
            break;

        case 8:
            stepEight();
            break;

    }

}


// ============================================================
// START SIMULATION
// ============================================================

function startSimulation() {

    if (started) {

        return;

    }

    started = true;

    consoleBox.innerHTML = "";

    log(
        "Starting DHCP Network simulation...",
        "info"
    );

    log(
        "Topology: Client-PC1 -> SW1 -> DHCP Server",
        "info"
    );

    executeStep();

}


// ============================================================
// NEXT STEP
// ============================================================

function nextStep() {

    if (!started) {

        startSimulation();

        return;

    }

    if (currentStep < totalSteps) {

        executeStep();

    }

}


// ============================================================
// RESET
// ============================================================

function resetSimulation() {

    currentStep = 0;

    started = false;

    client.ip = null;


    consoleBox.innerHTML = `

        <div>
            DHCP simulator ready...
        </div>

        <div>
            Click "Start Simulation" to begin.
        </div>

    `;


    progress.style.width =
        "0%";


    stepText.textContent =
        "Ready to start DHCP simulation.";


    updateMessage(

        "--",
        "--",
        "--",
        "--"

    );


    document.getElementById("client1IP")
        .textContent =
        "Not Assigned";


    document.getElementById("assignedIP")
        .textContent =
        "Not Assigned";


    document.getElementById("assignedMask")
        .textContent =
        "Not Assigned";


    document.getElementById("assignedGateway")
        .textContent =
        "Not Assigned";


    document.getElementById("assignedDNS")
        .textContent =
        "Not Assigned";


    document.getElementById("leaseTable")
        .innerHTML = `

        <tr>

            <td colspan="4">
                No active leases
            </td>

        </tr>

    `;


    document.getElementById("line1")
        .classList.remove("active");


    document.getElementById("line2")
        .classList.remove("active");


    const pingResult =
        document.getElementById("pingResult");

    pingResult.classList.remove("success");

    pingResult.textContent =
        "Waiting for DHCP configuration...";


    for (let i = 1; i <= 6; i++) {

        const test =
            document.getElementById("test" + i);

        test.textContent =
            "WAITING";

        test.classList.remove("pass");

    }

}