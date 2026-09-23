# 🌍 Global Free VPN

**Global Free VPN** is a privacy-focused, open-source VPN platform designed to provide simple and secure VPN connectivity through servers around the world.

The project is built around established open-source technologies such as **WireGuard**, **.NET 8**, **PostgreSQL**, **Docker**, and modern monitoring tools.

> **One application. Multiple countries. Open technology. Simple connectivity. Privacy by design.**

---

## ✨ Features

### 🌎 Global Server Network

* Worldwide VPN server support
* Country and city selection
* Automatic server selection
* Server latency monitoring
* Server load monitoring
* Server availability monitoring
* Automatic server failover
* Server health checks

Example locations:

```text
🇮🇳 India
🇺🇸 United States
🇬🇧 United Kingdom
🇩🇪 Germany
🇫🇷 France
🇯🇵 Japan
🇸🇬 Singapore
🇨🇦 Canada
🇦🇺 Australia
🇳🇱 Netherlands
🇧🇷 Brazil
🇰🇷 South Korea
```

Actual locations depend on the infrastructure operated by the project.

---

## 🔐 Security

Global Free VPN uses established VPN technology instead of implementing custom cryptography.

### Security features

* WireGuard VPN tunnels
* Secure key generation
* Kill switch
* DNS leak protection
* IPv6 leak protection
* Automatic reconnect
* Device management
* Server health monitoring
* Connection diagnostics
* Minimal logging architecture

> **Important:** Security features should be independently audited before the software is represented as providing guaranteed anonymity or security.

---

## ⚡ Smart Server Selection

Global Free VPN can automatically select a server using configurable metrics:

```text
                 ┌────────────────────┐
                 │   User Connects    │
                 └─────────┬──────────┘
                           │
                           ▼
                ┌─────────────────────┐
                │ Find Available      │
                │ VPN Servers         │
                └─────────┬───────────┘
                          │
             ┌────────────┼────────────┐
             ▼            ▼            ▼
          Latency       Load       Availability
             │            │            │
             └────────────┼────────────┘
                          ▼
                ┌─────────────────────┐
                │ Select Suitable     │
                │ Server               │
                └─────────┬───────────┘
                          ▼
                  ┌───────────────┐
                  │ WireGuard VPN │
                  │ Connection    │
                  └───────────────┘
```

---

# 🖥️ Supported Platforms

Planned platform support:

| Platform   | Status         |
| ---------- | -------------- |
| Windows    | 🚧 Development |
| Android    | 🚧 Development |
| Linux      | 🚧 Development |
| macOS      | 🚧 Planned     |
| Android TV | 🚧 Planned     |

---

# 🏗️ Architecture

```text
                         ┌──────────────────────┐
                         │     VPN Clients      │
                         │                      │
                         │ Windows / Android    │
                         │ Linux / macOS        │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                     ┌──────────────────────────┐
                     │      Control API         │
                     │                          │
                     │ ASP.NET Core / .NET 8    │
                     └────────────┬─────────────┘
                                  │
              ┌───────────────────┼───────────────────┐
              │                   │                   │
              ▼                   ▼                   ▼
       ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
       │ PostgreSQL  │     │    Redis    │     │ Monitoring  │
       │             │     │             │     │             │
       │ Users       │     │ Cache       │     │ Prometheus  │
       │ Servers     │     │ Sessions    │     │ Grafana     │
       │ Devices     │     │             │     │             │
       └─────────────┘     └─────────────┘     └─────────────┘

                    VPN Infrastructure
                           │
       ┌───────────────────┼────────────────────┐
       ▼                   ▼                    ▼
 ┌───────────┐       ┌───────────┐       ┌───────────┐
 │ 🇮🇳 India  │       │ 🇺🇸 USA    │       │ 🇩🇪 Germany│
 │ WireGuard │       │ WireGuard │       │ WireGuard │
 └───────────┘       └───────────┘       └───────────┘
```

---

# 🧰 Technology Stack

## Backend

* C#
* .NET 8
* ASP.NET Core Web API
* Entity Framework Core
* PostgreSQL
* Redis

## VPN

* WireGuard
* Linux networking
* IP routing
* Firewall configuration

## Desktop

* C#
* .NET 8
* WPF

## Web Administration

* React
* TypeScript
* Next.js

## Infrastructure

* Docker
* Docker Compose
* Linux
* Nginx/Caddy
* Prometheus
* Grafana

---

# 📁 Project Structure

```text
GlobalFreeVPN/
│
├── src/
│   │
│   ├── GlobalFreeVPN.Api/
│   │   ├── Controllers/
│   │   ├── Middleware/
│   │   ├── Services/
│   │   ├── Models/
│   │   └── Program.cs
│   │
│   ├── GlobalFreeVPN.Core/
│   │   ├── Entities/
│   │   ├── Interfaces/
│   │   ├── DTOs/
│   │   └── Security/
│   │
│   ├── GlobalFreeVPN.Infrastructure/
│   │   ├── Database/
│   │   ├── Redis/
│   │   ├── WireGuard/
│   │   └── Monitoring/
│   │
│   ├── GlobalFreeVPN.Windows/
│   │   ├── Views/
│   │   ├── ViewModels/
│   │   ├── Services/
│   │   └── Assets/
│   │
│   └── GlobalFreeVPN.Admin/
│       ├── pages/
│       ├── components/
│       └── services/
│
├── android/
│
├── deploy/
│   ├── docker-compose.yml
│   ├── wireguard/
│   ├── nginx/
│   └── monitoring/
│
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── deployment/
│   └── security/
│
├── tests/
│   ├── GlobalFreeVPN.Api.Tests/
│   ├── GlobalFreeVPN.Core.Tests/
│   └── GlobalFreeVPN.Infrastructure.Tests/
│
├── .github/
│   └── workflows/
│       ├── build.yml
│       └── tests.yml
│
├── LICENSE
├── README.md
└── docker-compose.yml
```

---

# 🚀 Quick Start

## Requirements

Install:

* Git
* .NET 8 SDK
* Docker
* Docker Compose
* PostgreSQL
* WireGuard
* Linux server for VPN infrastructure

Verify the installation:

```bash
dotnet --version
docker --version
docker compose version
git --version
```

---

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/GlobalFreeVPN.git
cd GlobalFreeVPN
```

---

## Start Infrastructure

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

---

## Build the Backend

```bash
dotnet restore
dotnet build
```

---

## Run the API

```bash
dotnet run --project src/GlobalFreeVPN.Api
```

The API will start using the configured development environment.

---

# 🔑 VPN Server Registration

Each VPN server registers with the control API.

Example server information:

```json
{
  "serverId": "india-mumbai-01",
  "country": "India",
  "city": "Mumbai",
  "endpoint": "vpn.example.com:51820",
  "protocol": "wireguard",
  "capacity": 100,
  "status": "online"
}
```

The server periodically sends health information to the control system.

Example:

```text
Server: india-mumbai-01
Status: ONLINE
Latency: 32 ms
Load: 41%
Users: 37
Capacity: 100
```

---

# 🔌 API Design

Example endpoints:

```text
GET    /api/servers
GET    /api/servers/{id}
GET    /api/servers/available

POST   /api/auth/register
POST   /api/auth/login

POST   /api/devices
GET    /api/devices

POST   /api/vpn/config
POST   /api/vpn/connect
POST   /api/vpn/disconnect

GET    /api/health
GET    /api/status
```

---

# 🛡️ Kill Switch

The client can optionally enable a kill switch.

When enabled:

```text
VPN Connected
      │
      ▼
Internet Traffic
      │
      ▼
WireGuard Tunnel
```

If the tunnel unexpectedly disconnects:

```text
WireGuard DOWN
      │
      ▼
Kill Switch
      │
      ▼
Block Internet Traffic
      │
      ▼
Reconnect VPN
      │
      ▼
Restore Internet Access
```

Implementation should be platform-specific and carefully tested to avoid accidental network lockouts.

---

# 🔄 Automatic Reconnect

Example reconnect logic:

```text
VPN connection lost
        ↓
Check server
        ↓
Server available?
   ┌────┴────┐
  YES       NO
   │         │
   ▼         ▼
Reconnect   Find another
            server
               │
               ▼
             Connect
```

---

# 📊 Monitoring

Prometheus can collect metrics such as:

```text
vpn_server_up
vpn_server_latency
vpn_server_users
vpn_server_capacity
vpn_server_bandwidth
vpn_connection_count
vpn_connection_errors
```

Grafana can visualize:

* Server availability
* Active connections
* Latency
* Bandwidth
* CPU usage
* Memory usage
* Network traffic
* Error rates

---

# 👨‍💼 Admin Dashboard

The administrator dashboard can provide:

### Dashboard

```text
GLOBAL FREE VPN
────────────────────────────────

Servers             42
Online              39
Offline              3
Active Users      8,241

Average Latency     61 ms
Network Traffic    2.4 TB

────────────────────────────────
```

### Server Management

```text
Country       City          Status      Load
------------------------------------------------
🇮🇳 India     Mumbai        ONLINE       41%
🇮🇳 India     Delhi         ONLINE       57%
🇺🇸 USA       New York      ONLINE       63%
🇩🇪 Germany   Frankfurt     ONLINE       35%
🇯🇵 Japan     Tokyo         OFFLINE       -
```

---

# 🔒 Privacy Principles

Global Free VPN should follow these principles:

1. Collect only information required to operate the service.
2. Clearly document data collection.
3. Avoid unnecessary traffic logging.
4. Protect account and device information.
5. Secure administrative interfaces.
6. Rotate credentials and server keys.
7. Publish transparent privacy documentation.
8. Make security-sensitive code reviewable where possible.

The project should **not claim “100% anonymous” or “100% secure”** without appropriate independent verification.

---

# 🆓 Free/Open-Source Model

The software can be completely free and open source.

However, operating a global VPN network requires infrastructure:

```text
Software
   ↓
Open Source
   ↓
No License Cost

VPN Infrastructure
   ↓
Servers + IP Addresses + Bandwidth
   ↓
Operating Cost
```

Possible infrastructure models include:

* Community-operated servers
* Sponsored servers
* Donations
* Grants
* Self-hosted deployments
* Non-profit infrastructure
* Limited free public nodes

Infrastructure costs and usage limits should be transparently documented.

---

# 🤝 Contributing

Contributions are welcome.

```bash
git clone https://github.com/YOUR_USERNAME/GlobalFreeVPN.git
cd GlobalFreeVPN

dotnet restore
dotnet build
dotnet test
```

Create a feature branch:

```bash
git checkout -b feature/my-feature
```

Commit your changes:

```bash
git commit -m "Add my feature"
```

Push:

```bash
git push origin feature/my-feature
```

Then open a Pull Request.

---

# 🧪 Testing

Run all .NET tests:

```bash
dotnet test
```

Build in Release mode:

```bash
dotnet build -c Release
```

Build Docker images:

```bash
docker compose build
```

---

# 📜 License

Choose an open-source license appropriate for the project before publishing.

For example:

```text
MIT License
```

or:

```text
Apache License 2.0
```

---

# ⚠️ Disclaimer

Global Free VPN is intended for legitimate privacy, security, networking, and development purposes.

Users are responsible for complying with the laws, regulations, network policies, and terms of service applicable to their location and the services they access.

The project does not provide anonymity guarantees and does not encourage bypassing lawful restrictions, security controls, or access controls.

---

# 🌍 Vision

**Global Free VPN** aims to make modern VPN technology easier to understand, deploy, operate, and contribute to.

```text
                 GLOBAL FREE VPN

              🌍 Worldwide Network
                     +
              🔐 Modern Encryption
                     +
              ⚡ Smart Connections
                     +
              🛡️ Privacy by Design
                     +
              🧑‍💻 Open Source
                     =
             Accessible VPN Technology
```

---

## ⭐ Support the Project

If you find Global Free VPN useful:

* ⭐ Star the repository
* 🐛 Report bugs
* 💡 Suggest features
* 🔧 Submit pull requests
* 📖 Improve documentation
* 🌍 Operate community infrastructure

**Built with open technology for a more accessible internet.**
