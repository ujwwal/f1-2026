
# F1 2026 Race Strategy Suite

A comprehensive data science and AI portfolio project focused on Formula 1 race strategy under the impending 2026 technical regulations. This suite models advanced telemetry, energy deployment, and active aerodynamics.

## Project Vision
This repository serves as a multi-module technical demonstration of Data Engineering, SQL, Cloud Infrastructure, and Machine Learning. The primary goal is to simulate and optimize race strategies by ingesting historical telemetry and applying predictive models.

## Architecture & Modules

### Module 1: Data Core (Active Development)
The foundation of the suite. Ingests, cleans, and stores high-fidelity race data.
* **Data Source:** `fastf1` Python library for lap telemetry (speed, throttle, braking, gear, RPM).
* **Storage:** Oracle Cloud Infrastructure (OCI) Database.
* **Processing:** SQL for aggregation and Python/Pandas for transformations.

### Module 2: Energy Brain (Planned)
A Reinforcement Learning (RL) model designed to simulate the 50/50 ICE-to-Electrical power ratio introduced in the 2026 engine regulations.
* **Focus:** Optimizing energy deployment and harvesting over a race distance.

### Module 3: Active Aero Logic (Planned)
Predictive modeling for the 2026 active aerodynamics (X-Mode for drag reduction, Z-Mode for high downforce).
* **Focus:** Determining optimal DRS/Active Aero activation zones based on historical speed traps and cornering telemetry.

## Tech Stack
* **Language:** Python 3.x
* **Data Handling:** Pandas, FastF1
* **Database:** SQL, Oracle Cloud DB (OCI)
* **Machine Learning:** Scikit-Learn, PyTorch (Future)

## Setup & Initialization
bash
# Clone the repository
git clone https://github.com/yourusername/f1-2026-suite.git

# Navigate to the directory
cd f1-2026-suite

# Create a virtual environment
python -m venv venv

# Activate the virtual environment (Linux/Mac)
source venv/bin/activate
# Or on Windows: venv\Scripts\activate

# Install requirements (currently just fastf1 and pandas)
pip install fastf1 pandas
