#!/usr/bin/env python3
"""
HISVIA Phase 4.4 — Supply Chain Intelligence Generator
Maps industrial classification → procurement language, capability tags, SEO content.
Rule-based, grounded in taxonomy V1. No LLM calls needed.
"""

import json
from pathlib import Path
from collections import Counter

BASE = Path("/Users/liujunkai/Downloads/hisvia-web 2")
IN_DIR = BASE / "data/asset-pipeline/cutout-library/golden-set/classification-test-v2"
OUT_DIR = IN_DIR / "supply-intelligence"

with open(IN_DIR / "deepseek-results-v2.json", "r") as f:
    DATA = json.load(f)

results = DATA["results"]
OUT_DIR.mkdir(parents=True, exist_ok=True)

# ============================================================
# PROCUREMENT LANGUAGE TEMPLATES
# system_type + category → buyer language
# ============================================================

PROCUREMENT_MAP = {
    ("Air Compressor Systems", "Compressors"): {
        "buyer_need": "Industrial compressed air system — rotary screw/piston compressor unit for continuous 24/7 operation",
        "purchase_keywords": [
            "industrial air compressor supplier China",
            "rotary screw compressor factory price",
            "compressed air system for manufacturing plant",
            "oil-injected compressor replacement",
            "energy-efficient air compressor wholesale",
        ],
        "replacement_scenarios": [
            "Aging compressor efficiency drop → upgrade to VSD model",
            "Plant expansion requiring higher CFM capacity",
            "Compressor end-of-life → full unit replacement",
        ],
        "compatible_equipment": [
            "Air receiver tank", "Refrigerated air dryer", "Desiccant dryer",
            "Coalescing filter", "Compressed air piping system",
        ],
        "buyer_questions": [
            "What CFM at what PSI?",
            "Fixed speed or VSD?",
            "Oil-injected or oil-free?",
            "What's the motor power (kW/HP)?",
            "Indoor or outdoor installation?",
        ],
    },
    ("Air Compressor Systems", "Compressor Components"): {
        "buyer_need": "Compressor spare parts and service components — OEM or equivalent quality replacement",
        "purchase_keywords": [
            "air compressor spare parts supplier",
            "oil separator replacement element",
            "compressor air end overhaul kit",
            "compressor controller repair",
        ],
        "replacement_scenarios": [
            "Scheduled maintenance — oil separator change",
            "Air end bearing failure → rebuild or replace",
            "Controller malfunction → upgrade to digital controller",
        ],
        "compatible_equipment": [
            "Atlas Copco GA series", "KAESER ASK series", "CompAir L series",
            "Ingersoll Rand UP series",
        ],
        "buyer_questions": [
            "Compatible with which compressor model?",
            "OEM or aftermarket quality?",
            "Service life (hours)?",
        ],
    },
    ("Air Compressor Systems", "Air Treatment"): {
        "buyer_need": "Compressed air drying and treatment equipment — meet ISO 8573 air quality standards",
        "purchase_keywords": [
            "refrigerated air dryer supplier China",
            "desiccant air dryer for compressor",
            "compressed air treatment system",
            "air receiver tank manufacturer",
        ],
        "replacement_scenarios": [
            "Moisture in compressed air lines → install dryer",
            "Paint shop requiring -40°C pressure dew point",
            "Food-grade compressed air → desiccant + filtration",
        ],
        "compatible_equipment": [
            "Air compressor", "Coalescing filter", "Oil-water separator",
        ],
        "buyer_questions": [
            "Pressure dew point requirement?",
            "Maximum pressure and flow rate?",
            "Indoor or outdoor?",
        ],
    },
    ("Air Compressor Systems", "Air Filtration"): {
        "buyer_need": "Compressed air filtration — remove oil, water, particulates to ISO 8573-1 class",
        "purchase_keywords": [
            "compressed air filter element supplier",
            "coalescing filter for compressor",
            "air line filter wholesale",
        ],
        "replacement_scenarios": [
            "Filter element saturated → replace",
            "Upgrading air quality class",
            "New compressor installation → add filtration train",
        ],
        "compatible_equipment": [
            "Air compressor", "Refrigerated dryer", "Desiccant dryer",
        ],
        "buyer_questions": [
            "Filtration grade (µm)?",
            "Oil removal efficiency?",
            "Connection size?",
        ],
    },

    ("Hydraulic Systems", "Hydraulic Power Units"): {
        "buyer_need": "Complete hydraulic power unit — custom or standard HPU for industrial machinery",
        "purchase_keywords": [
            "hydraulic power unit manufacturer China",
            "custom HPU for industrial press",
            "hydraulic station for machine tool",
            "compact hydraulic power pack supplier",
        ],
        "replacement_scenarios": [
            "Machine tool hydraulic system upgrade",
            "Industrial press HPU end-of-life replacement",
            "New production line → design + build HPU",
        ],
        "compatible_equipment": [
            "Hydraulic cylinder", "Directional control valve",
            "Pressure relief valve", "Hydraulic manifold",
        ],
        "buyer_questions": [
            "Required flow rate (L/min) and pressure (bar)?",
            "Tank capacity?",
            "Fixed or variable displacement pump?",
            "Cooling required?",
        ],
    },
    ("Hydraulic Systems", "Hydraulic Components"): {
        "buyer_need": "Hydraulic pump/motor/cylinder — replacement or new application component",
        "purchase_keywords": [
            "hydraulic pump supplier China",
            "hydraulic cylinder manufacturer",
            "hydraulic motor replacement",
            "piston pump spare parts",
        ],
        "replacement_scenarios": [
            "Hydraulic pump wear → pressure drop → replace",
            "Cylinder seal failure → rebuild or replace",
            "Machine retrofit → upgrade hydraulic components",
        ],
        "compatible_equipment": [
            "HPU", "Hydraulic manifold", "Pressure filter",
        ],
        "buyer_questions": [
            "Displacement (cc/rev) and pressure rating?",
            "Mounting type (SAE/ISO/flange)?",
            "Shaft type and rotation?",
        ],
    },
    ("Hydraulic Systems", "Hydraulic Valves"): {
        "buyer_need": "Hydraulic directional/pressure/flow control valves — industrial hydraulic system",
        "purchase_keywords": [
            "hydraulic directional valve supplier",
            "proportional valve manufacturer",
            "hydraulic pressure relief valve",
            "hydraulic check valve wholesale",
        ],
        "replacement_scenarios": [
            "Valve spool wear → leakage → replace",
            "System upgrade → add proportional control",
            "Safety compliance → add pressure relief",
        ],
        "compatible_equipment": [
            "HPU", "Hydraulic manifold", "Hydraulic cylinder",
        ],
        "buyer_questions": [
            "NG size and mounting pattern?",
            "Flow capacity (L/min)?",
            "Manual/solenoid/proportional actuation?",
        ],
    },
    ("Hydraulic Systems", "Hydraulic Controls"): {
        "buyer_need": "Advanced hydraulic motion control — proportional/servo valves and controllers",
        "purchase_keywords": [
            "proportional hydraulic valve supplier",
            "servo hydraulic system China",
            "closed-loop hydraulic control",
            "hydraulic motion controller",
        ],
        "replacement_scenarios": [
            "Upgrade from manual to electro-hydraulic control",
            "Precision positioning → servo valve retrofit",
            "Industry 4.0 → IoT-enabled hydraulic control",
        ],
        "compatible_equipment": [
            "HPU", "Hydraulic cylinder with position sensor",
        ],
        "buyer_questions": [
            "Control precision required (µm)?",
            "Communication protocol (CANbus/EtherCAT/IO-Link)?",
            "Feedback type?",
        ],
    },

    ("Pneumatic Automation", "Pneumatic Components"): {
        "buyer_need": "Pneumatic cylinders, valves, and fittings — factory automation actuation",
        "purchase_keywords": [
            "pneumatic cylinder supplier China",
            "solenoid valve for automation",
            "pneumatic fitting wholesale",
            "air cylinder manufacturer",
        ],
        "replacement_scenarios": [
            "Cylinder seal wear → replace",
            "New automation station → specify pneumatic circuit",
            "Valve coil burnout → replace solenoid valve",
        ],
        "compatible_equipment": [
            "FRL unit", "Compressed air supply", "PLC controller",
        ],
        "buyer_questions": [
            "Bore size and stroke length?",
            "Single or double acting?",
            "Port size?",
        ],
    },
    ("Pneumatic Automation", "Pneumatic Actuators"): {
        "buyer_need": "Rotary and linear pneumatic actuators for industrial automation end-effectors",
        "purchase_keywords": [
            "pneumatic rotary actuator supplier",
            "pneumatic gripper for robot arm",
            "linear actuator pneumatic",
        ],
        "replacement_scenarios": [
            "Robot end-of-arm tooling upgrade",
            "Actuator wear → force loss → replace",
        ],
        "compatible_equipment": [
            "Robot arm", "FRL unit", "Solenoid valve bank",
        ],
        "buyer_questions": [
            "Torque/force requirement?",
            "Rotation angle or stroke?",
            "Mounting interface?",
        ],
    },
    ("Pneumatic Automation", "Air Preparation"): {
        "buyer_need": "FRL units — filter, regulator, lubricator for compressed air quality in pneumatic systems",
        "purchase_keywords": [
            "FRL unit supplier China",
            "air filter regulator lubricator",
            "pneumatic air preparation system",
        ],
        "replacement_scenarios": [
            "Filter element clogged → replace FRL unit",
            "New machine → install air preparation",
            "Poor air quality causing valve failures → upgrade filtration",
        ],
        "compatible_equipment": [
            "Pneumatic valve manifold", "Pneumatic cylinder",
        ],
        "buyer_questions": [
            "Flow capacity?",
            "Filtration grade (µm)?",
            "Port size?",
        ],
    },

    ("Industrial Filtration", "Dust Filtration"): {
        "buyer_need": "Industrial dust collection system — protect workers and equipment from airborne particulates",
        "purchase_keywords": [
            "industrial dust collector manufacturer China",
            "baghouse dust collector supplier",
            "cartridge dust collector for factory",
            "cyclone separator dust collection",
        ],
        "replacement_scenarios": [
            "Factory expansion → larger dust collection system",
            "Filter media exhausted → replace cartridges",
            "Environmental compliance → upgrade to HEPA filtration",
        ],
        "compatible_equipment": [
            "Ductwork system", "Fan/blower", "Spark arrestor",
            "Rotary airlock valve",
        ],
        "buyer_questions": [
            "Airflow (m³/h or CFM)?",
            "Dust type and particle size?",
            "Explosive dust (ATEX requirements)?",
            "Indoor or outdoor installation?",
        ],
    },
    ("Industrial Filtration", "Filter Elements"): {
        "buyer_need": "Replacement filter elements/cartridges for industrial filtration systems",
        "purchase_keywords": [
            "industrial filter element supplier",
            "replacement filter cartridge",
            "oil filter element wholesale",
            "air filter cartridge manufacturer",
        ],
        "replacement_scenarios": [
            "Scheduled filter change",
            "Filter bypass alarm → immediate replacement",
            "Upgrade to higher efficiency media",
        ],
        "compatible_equipment": [
            "Filter housing", "Hydraulic power unit", "Compressor",
            "Dust collector",
        ],
        "buyer_questions": [
            "Filtration rating (µm, β ratio)?",
            "Dimensions (OD/ID/length)?",
            "Media type (cellulose/glass fiber/wire mesh)?",
        ],
    },
    ("Industrial Filtration", "Precision Filtration"): {
        "buyer_need": "High-efficiency filtration — HEPA, micro, membrane for critical applications",
        "purchase_keywords": [
            "HEPA filter supplier China",
            "membrane filtration system",
            "micro filtration for pharmaceutical",
        ],
        "replacement_scenarios": [
            "Cleanroom certification → HEPA replacement",
            "Process upgrade → finer filtration",
        ],
        "compatible_equipment": [
            "Filter housing", "Air handling unit", "Cleanroom ceiling grid",
        ],
        "buyer_questions": [
            "Efficiency class (H13/H14/U15)?",
            "Flow rate at pressure drop?",
            "Frame type?",
        ],
    },
    ("Industrial Filtration", "Industrial Filters"): {
        "buyer_need": "Hydraulic, lubrication, and process filters for industrial machinery protection",
        "purchase_keywords": [
            "hydraulic filter supplier China",
            "lubrication filter element",
            "process filter for chemical plant",
        ],
        "replacement_scenarios": [
            "Hydraulic system contamination → filter change",
            "Lubrication system maintenance schedule",
            "Process fluid quality issue → add inline filter",
        ],
        "compatible_equipment": [
            "Hydraulic power unit", "Gearbox", "Compressor",
            "Pump skid",
        ],
        "buyer_questions": [
            "Pressure rating?",
            "Bypass valve setting?",
            "Connection type?",
        ],
    },

    ("Pumps & Fluid Handling", "Centrifugal Pumps"): {
        "buyer_need": "Centrifugal pump for water, chemical, or industrial fluid transfer application",
        "purchase_keywords": [
            "centrifugal pump manufacturer China",
            "industrial water pump supplier",
            "chemical process pump factory",
            "stainless steel centrifugal pump",
        ],
        "replacement_scenarios": [
            "Pump cavitation damage → impeller replacement",
            "Process expansion → higher flow pump",
            "Corrosion failure → upgrade to SS316 construction",
        ],
        "compatible_equipment": [
            "Electric motor", "Mechanical seal", "Coupling",
            "Control valve", "Check valve",
        ],
        "buyer_questions": [
            "Flow rate (m³/h) and head (m)?",
            "Fluid type and temperature?",
            "Material (cast iron/SS304/SS316)?",
            "Seal type (mechanical/packing)?",
        ],
    },
    ("Pumps & Fluid Handling", "Gear Pumps"): {
        "buyer_need": "Positive displacement gear pump for oils, fuels, viscous fluids",
        "purchase_keywords": [
            "gear pump manufacturer China",
            "hydraulic gear pump supplier",
            "fuel transfer pump wholesale",
        ],
        "replacement_scenarios": [
            "Gear wear → flow loss → replace",
            "New hydraulic system → specify gear pump",
        ],
        "compatible_equipment": [
            "Electric motor", "Relief valve", "Suction strainer",
        ],
        "buyer_questions": [
            "Displacement (cc/rev)?",
            "Viscosity range?",
            "Mounting flange?",
        ],
    },
    ("Pumps & Fluid Handling", "Screw Pumps"): {
        "buyer_need": "Screw pump for high-viscosity fluids, multiphase, or low-shear applications",
        "purchase_keywords": [
            "screw pump supplier China",
            "twin screw pump manufacturer",
            "progressive cavity pump for oil",
        ],
        "replacement_scenarios": [
            "Screw/rotor wear → rebuild or replace pump",
            "Process change → different viscosity pump",
        ],
        "compatible_equipment": [
            "Electric motor", "Mechanical seal", "Pressure relief valve",
        ],
        "buyer_questions": [
            "Fluid viscosity and temperature?",
            "Differential pressure?",
            "Single/twin/triple screw?",
        ],
    },
    ("Pumps & Fluid Handling", "Diaphragm Pumps"): {
        "buyer_need": "Air-operated or electric diaphragm pump for chemical transfer, sludge, abrasive fluids",
        "purchase_keywords": [
            "diaphragm pump manufacturer China",
            "AODD pump supplier",
            "chemical transfer diaphragm pump",
        ],
        "replacement_scenarios": [
            "Diaphragm rupture → rebuild kit",
            "Process requires chemical-resistant pump",
        ],
        "compatible_equipment": [
            "Compressed air supply (AODD)", "Pulsation dampener",
        ],
        "buyer_questions": [
            "Fluid compatibility (diaphragm material)?",
            "Max solids size?",
            "Suction lift?",
        ],
    },
    ("Pumps & Fluid Handling", "Vacuum Pumps"): {
        "buyer_need": "Industrial vacuum pump for packaging, holding, drying, or process applications",
        "purchase_keywords": [
            "vacuum pump manufacturer China",
            "rotary vane vacuum pump supplier",
            "industrial vacuum system",
        ],
        "replacement_scenarios": [
            "Vacuum level insufficient → pump rebuild",
            "Production line → add vacuum station",
        ],
        "compatible_equipment": [
            "Vacuum tank", "Vacuum valve", "Vacuum gauge",
        ],
        "buyer_questions": [
            "Ultimate vacuum (mbar)?",
            "Pumping speed (m³/h)?",
            "Oil-lubricated or dry?",
        ],
    },
    ("Pumps & Fluid Handling", "Metering Pumps"): {
        "buyer_need": "Chemical dosing/metering pump — precise flow control for water treatment, process",
        "purchase_keywords": [
            "metering pump manufacturer China",
            "chemical dosing pump supplier",
            "diaphragm metering pump wholesale",
        ],
        "replacement_scenarios": [
            "Dosing accuracy drift → recalibrate or replace",
            "Chemical compatibility issue → change wetted materials",
        ],
        "compatible_equipment": [
            "Chemical tank", "Injection valve", "Flow meter",
        ],
        "buyer_questions": [
            "Flow range and turn-down ratio?",
            "Chemical compatibility?",
            "Manual or automatic stroke adjustment?",
        ],
    },

    ("Valves & Flow Control", "Ball Valves"): {
        "buyer_need": "Industrial ball valve for on/off flow control — water, oil, gas, chemical lines",
        "purchase_keywords": [
            "industrial ball valve supplier China",
            "stainless steel ball valve wholesale",
            "pneumatic actuated ball valve",
        ],
        "replacement_scenarios": [
            "Valve seat wear → leakage → replace",
            "Process upgrade → add actuation",
            "Corrosion → upgrade to SS316",
        ],
        "compatible_equipment": [
            "Pneumatic/electric actuator", "Limit switch", "Solenoid valve",
        ],
        "buyer_questions": [
            "Size (DN) and pressure rating (PN)?",
            "Body material (WCB/SS304/SS316)?",
            "Manual or actuated?",
            "Connection (flanged/threaded/weld)?",
        ],
    },
    ("Valves & Flow Control", "Butterfly Valves"): {
        "buyer_need": "Butterfly valve for large-diameter flow control — water treatment, HVAC, process",
        "purchase_keywords": [
            "butterfly valve manufacturer China",
            "wafer butterfly valve supplier",
            "triple offset butterfly valve",
        ],
        "replacement_scenarios": [
            "Seat degradation → replace valve",
            "Pipeline expansion → larger diameter valve",
        ],
        "compatible_equipment": [
            "Actuator", "Gear operator", "Flange gasket",
        ],
        "buyer_questions": [
            "DN size?",
            "Wafer/lug/flanged?",
            "Seat material (EPDM/PTFE/metal)?",
        ],
    },
    ("Valves & Flow Control", "Gate Valves"): {
        "buyer_need": "Gate valve for full-bore isolation — water mains, oil pipelines, steam systems",
        "purchase_keywords": [
            "gate valve supplier China",
            "cast steel gate valve",
            "resilient seated gate valve",
        ],
        "replacement_scenarios": [
            "Gate/seating surface wear → leak-through → replace",
            "Pipeline section isolation → install new gate valve",
        ],
        "compatible_equipment": [
            "Gear operator", "Electric actuator",
        ],
        "buyer_questions": [
            "DN and PN rating?",
            "Rising or non-rising stem?",
            "Flanged or welded?",
        ],
    },
    ("Valves & Flow Control", "Check Valves"): {
        "buyer_need": "Check/non-return valve to prevent backflow in fluid systems",
        "purchase_keywords": [
            "check valve supplier China",
            "swing check valve wholesale",
            "dual plate check valve",
        ],
        "replacement_scenarios": [
            "Check valve slam → water hammer → replace",
            "Spring fatigue → valve fails to close → replace",
        ],
        "compatible_equipment": [
            "Pump discharge", "Compressor discharge",
        ],
        "buyer_questions": [
            "Type (swing/lift/dual plate)?",
            "Cracking pressure?",
            "Installation orientation?",
        ],
    },
    ("Valves & Flow Control", "Control Valves"): {
        "buyer_need": "Process control valve with positioner — precise flow/pressure/temperature regulation",
        "purchase_keywords": [
            "control valve manufacturer China",
            "pneumatic control valve with positioner",
            "electric control valve for process",
        ],
        "replacement_scenarios": [
            "Trim wear → control instability → replace trim",
            "Process optimization → upgrade to digital positioner",
        ],
        "compatible_equipment": [
            "I/P positioner", "Actuator", "Flow sensor",
        ],
        "buyer_questions": [
            "Cv/Kv requirement?",
            "Body and trim material?",
            "4-20mA or fieldbus control?",
        ],
    },
    ("Valves & Flow Control", "Safety Valves"): {
        "buyer_need": "Pressure safety/relief valve — protect pressure vessels and piping from overpressure",
        "purchase_keywords": [
            "safety relief valve supplier China",
            "spring loaded safety valve",
            "ASME certified relief valve",
        ],
        "replacement_scenarios": [
            "Annual certification → valve fails test → replace",
            "Process pressure change → re-spec relief valve",
        ],
        "compatible_equipment": [
            "Pressure vessel", "Boiler", "Compressed air receiver",
        ],
        "buyer_questions": [
            "Set pressure and capacity?",
            "Certification (ASME/PED)?",
            "Open or closed bonnet?",
        ],
    },

    ("Mechanical Transmission", "Bearings"): {
        "buyer_need": "Industrial rolling element bearing — replacement for rotating equipment",
        "purchase_keywords": [
            "industrial bearing supplier China",
            "ball bearing wholesale",
            "roller bearing manufacturer",
            "bearing for electric motor",
        ],
        "replacement_scenarios": [
            "Bearing noise/vibration → wear → replace",
            "Preventive maintenance schedule → bearing change",
            "Equipment upgrade → higher precision bearing",
        ],
        "compatible_equipment": [
            "Electric motor", "Pump shaft", "Gearbox",
            "Conveyor roller",
        ],
        "buyer_questions": [
            "Bearing number/designation?",
            "Sealed or open?",
            "Clearance (C3/C4)?",
            "Brand preference?",
        ],
    },
    ("Mechanical Transmission", "Gears"): {
        "buyer_need": "Industrial gear — spur, helical, bevel, worm gear for power transmission",
        "purchase_keywords": [
            "industrial gear manufacturer China",
            "helical gear supplier",
            "worm gear reducer component",
        ],
        "replacement_scenarios": [
            "Gear tooth wear → backlash → replace gear set",
            "Gearbox rebuild → replace worn gears",
        ],
        "compatible_equipment": [
            "Gearbox housing", "Bearing", "Shaft",
        ],
        "buyer_questions": [
            "Module/pitch and tooth count?",
            "Material and heat treatment?",
            "Helix angle?",
        ],
    },
    ("Mechanical Transmission", "Couplings"): {
        "buyer_need": "Shaft coupling — connect motor to pump/compressor/fan, transmit torque",
        "purchase_keywords": [
            "shaft coupling supplier China",
            "flexible coupling for pump",
            "jaw coupling wholesale",
        ],
        "replacement_scenarios": [
            "Coupling element wear → replace spider/insert",
            "Misalignment issue → upgrade to flexible coupling",
        ],
        "compatible_equipment": [
            "Electric motor", "Pump", "Compressor", "Gearbox",
        ],
        "buyer_questions": [
            "Shaft diameters and keyway sizes?",
            "Torque and RPM?",
            "Flexible or rigid?",
        ],
    },
    ("Mechanical Transmission", "Seals & Gaskets"): {
        "buyer_need": "Mechanical seals and static gaskets for rotating equipment and flange connections",
        "purchase_keywords": [
            "mechanical seal supplier China",
            "pump mechanical seal replacement",
            "gasket sheet wholesale",
            "o-ring kit supplier",
        ],
        "replacement_scenarios": [
            "Pump seal leak → replace mechanical seal",
            "Flange gasket blowout → replace",
            "Preventive maintenance → seal/gasket kit",
        ],
        "compatible_equipment": [
            "Centrifugal pump", "Compressor", "Valve bonnet",
        ],
        "buyer_questions": [
            "Shaft diameter and seal type?",
            "Fluid and temperature compatibility?",
            "Single or double seal?",
        ],
    },
    ("Mechanical Transmission", "Shafts"): {
        "buyer_need": "Precision machined shaft — replacement or custom for rotating equipment",
        "purchase_keywords": [
            "precision shaft manufacturer China",
            "pump shaft replacement",
            "linear motion shaft supplier",
        ],
        "replacement_scenarios": [
            "Shaft wear at bearing seat → re-machine or replace",
            "Shaft breakage → emergency replacement",
        ],
        "compatible_equipment": [
            "Bearing", "Coupling", "Mechanical seal",
        ],
        "buyer_questions": [
            "Diameter and length?",
            "Material and surface finish?",
            "Keyway and thread specifications?",
        ],
    },
    ("Mechanical Transmission", "Belt & Chain Drives"): {
        "buyer_need": "V-belt, timing belt, or roller chain drive for industrial power transmission",
        "purchase_keywords": [
            "v-belt supplier China",
            "timing belt wholesale",
            "roller chain manufacturer",
        ],
        "replacement_scenarios": [
            "Belt wear/cracking → replace belt set",
            "Chain stretch → replace chain and sprockets",
        ],
        "compatible_equipment": [
            "Pulley", "Sprocket", "Tensioner", "Motor",
        ],
        "buyer_questions": [
            "Belt/chain type and size?",
            "Center distance?",
            "Power transmitted?",
        ],
    },

    ("Industrial Automation & Control", "PLCs & Controllers"): {
        "buyer_need": "PLC/programmable controller for industrial machine or process automation",
        "purchase_keywords": [
            "PLC controller supplier China",
            "industrial automation PLC",
            "Siemens/ABB compatible PLC",
            "compact PLC for small machine",
        ],
        "replacement_scenarios": [
            "Controller obsolescence → upgrade to current model",
            "Machine retrofit → add PLC control",
            "IO expansion needed → add modules",
        ],
        "compatible_equipment": [
            "HMI touch panel", "IO modules", "VFD drive",
            "Sensor", "Power supply",
        ],
        "buyer_questions": [
            "IO point count?",
            "Communication protocol?",
            "Programming software preference?",
        ],
    },
    ("Industrial Automation & Control", "Sensors"): {
        "buyer_need": "Industrial sensors — proximity, photoelectric, pressure, temperature, flow, level",
        "purchase_keywords": [
            "industrial sensor supplier China",
            "proximity sensor wholesale",
            "pressure transmitter manufacturer",
        ],
        "replacement_scenarios": [
            "Sensor failure → production stoppage → replace",
            "Machine upgrade → add condition monitoring sensors",
            "Quality improvement → add inspection sensors",
        ],
        "compatible_equipment": [
            "PLC", "HMI", "Data logger",
        ],
        "buyer_questions": [
            "Sensing range/type?",
            "Output (NPN/PNP/4-20mA/IO-Link)?",
            "Environmental rating (IP67/IP69K)?",
        ],
    },
    ("Industrial Automation & Control", "VFDs & Drives"): {
        "buyer_need": "Variable frequency drive — motor speed control for pumps, fans, compressors, conveyors",
        "purchase_keywords": [
            "VFD drive supplier China",
            "variable frequency drive manufacturer",
            "motor speed controller for pump",
        ],
        "replacement_scenarios": [
            "Fixed-speed motor → add VFD for energy saving",
            "Drive failure → replace",
            "Process requires speed variation → install VFD",
        ],
        "compatible_equipment": [
            "Electric motor", "PLC", "HMI", "Braking resistor",
        ],
        "buyer_questions": [
            "Motor kW and voltage?",
            "Constant or variable torque?",
            "Enclosure (IP20/IP54)?",
        ],
    },
    ("Industrial Automation & Control", "HMI & Displays"): {
        "buyer_need": "HMI touch panel — operator interface for machine control and monitoring",
        "purchase_keywords": [
            "HMI touch screen supplier China",
            "industrial panel PC manufacturer",
            "operator interface terminal",
        ],
        "replacement_scenarios": [
            "Display failure → replace HMI",
            "Machine upgrade → larger/more capable HMI",
            "Remote monitoring → add web-enabled HMI",
        ],
        "compatible_equipment": [
            "PLC", "VFD", "Sensor network",
        ],
        "buyer_questions": [
            "Screen size?",
            "Communication protocol?",
            "IP rating?",
        ],
    },
    ("Industrial Automation & Control", "IO & Communication"): {
        "buyer_need": "IO modules, gateways, communication interfaces for industrial automation systems",
        "purchase_keywords": [
            "IO module supplier China",
            "fieldbus gateway manufacturer",
            "remote IO for PLC",
        ],
        "replacement_scenarios": [
            "IO point expansion → add remote IO",
            "Protocol conversion → add gateway",
            "Legacy system → add communication interface",
        ],
        "compatible_equipment": [
            "PLC", "HMI", "SCADA system",
        ],
        "buyer_questions": [
            "IO count and type?",
            "Fieldbus (PROFINET/EtherCAT/Modbus)?",
            "Distributed or centralized?",
        ],
    },
}

# ============================================================
# SUPPLIER CAPABILITY TAGS
# ============================================================

CAPABILITY_MAP = {
    "Air Compressor Systems": {
        "manufacturing_capability": [
            "Air Compressor Assembly & Testing",
            "Compressed Air System Design",
            "Compressor Package Engineering",
            "Air Treatment Integration",
        ],
        "supplier_type": "Air Compressor & Compressed Air System Manufacturer",
        "industry_scope": [
            "General Manufacturing", "Food & Beverage", "Pharmaceutical",
            "Electronics", "Automotive", "Textile", "Chemical Processing",
            "Oil & Gas", "Power Generation",
        ],
        "export_potential": "High — global demand for energy-efficient compressed air solutions",
    },
    "Hydraulic Systems": {
        "manufacturing_capability": [
            "Hydraulic Power Unit Design & Build",
            "Hydraulic Manifold CNC Machining",
            "Hydraulic System Testing & Commissioning",
            "Electro-Hydraulic Control Integration",
        ],
        "supplier_type": "Hydraulic System & Component Manufacturer",
        "industry_scope": [
            "Heavy Machinery", "Construction Equipment", "Mining",
            "Marine & Offshore", "Steel Mills", "Injection Molding",
            "Industrial Presses",
        ],
        "export_potential": "High — hydraulic components are standardized global commodities",
    },
    "Pneumatic Automation": {
        "manufacturing_capability": [
            "Pneumatic Cylinder & Valve Manufacturing",
            "FRL Assembly & Testing",
            "Pneumatic Circuit Design",
            "Automation End-Effector Engineering",
        ],
        "supplier_type": "Pneumatic Automation Component Manufacturer",
        "industry_scope": [
            "Factory Automation", "Packaging", "Assembly Lines",
            "Automotive Manufacturing", "Electronics Assembly",
            "Food Processing",
        ],
        "export_potential": "High — pneumatic components are ISO-standardized global products",
    },
    "Industrial Filtration": {
        "manufacturing_capability": [
            "Filter Element Manufacturing",
            "Dust Collection System Design",
            "Filter Media Selection & Testing",
            "Air Quality Compliance Engineering",
        ],
        "supplier_type": "Industrial Filtration System Manufacturer",
        "industry_scope": [
            "Cement", "Steel", "Woodworking", "Pharmaceutical",
            "Chemical Processing", "Mining", "Food Processing",
            "Power Generation",
        ],
        "export_potential": "High — filtration is mandatory in all industrial sectors globally",
    },
    "Pumps & Fluid Handling": {
        "manufacturing_capability": [
            "Pump Assembly & Performance Testing",
            "Fluid Handling System Design",
            "Pump Skid Fabrication",
            "Mechanical Seal Integration",
        ],
        "supplier_type": "Industrial Pump & Fluid Handling Equipment Manufacturer",
        "industry_scope": [
            "Water & Wastewater", "Chemical Processing", "Oil & Gas",
            "Marine", "Agriculture", "HVAC", "Mining",
            "Power Generation",
        ],
        "export_potential": "Very High — pumps are the #1 rotating equipment globally",
    },
    "Valves & Flow Control": {
        "manufacturing_capability": [
            "Valve Casting & Machining",
            "Valve Assembly & Pressure Testing",
            "Actuation Integration",
            "Flow Control System Engineering",
        ],
        "supplier_type": "Industrial Valve & Flow Control Manufacturer",
        "industry_scope": [
            "Oil & Gas", "Petrochemical", "Water Treatment",
            "Power Generation", "Chemical", "HVAC",
            "Marine", "Pharmaceutical",
        ],
        "export_potential": "Very High — valves are essential in every pipeline system worldwide",
    },
    "Mechanical Transmission": {
        "manufacturing_capability": [
            "Precision Bearing Manufacturing",
            "Gear Cutting & Heat Treatment",
            "Coupling Design & Testing",
            "Power Transmission System Engineering",
        ],
        "supplier_type": "Mechanical Power Transmission Component Manufacturer",
        "industry_scope": [
            "All Manufacturing", "Automotive", "Mining",
            "Agriculture", "Wind Energy", "Railway",
            "Marine", "Construction",
        ],
        "export_potential": "Very High — bearings and gears are global commodity components",
    },
    "Industrial Automation & Control": {
        "manufacturing_capability": [
            "PLC & Control Panel Assembly",
            "Sensor Calibration & Testing",
            "VFD Configuration & Testing",
            "SCADA System Integration",
            "Industrial IoT Gateway Configuration",
        ],
        "supplier_type": "Industrial Automation & Control System Integrator",
        "industry_scope": [
            "All Manufacturing Sectors", "Smart Factory",
            "Industry 4.0", "Process Automation", "Building Automation",
            "Energy Management",
        ],
        "export_potential": "High — industrial automation is a global megatrend",
    },
}

# ============================================================
# SEO SEMANTIC MAP
# ============================================================

SEO_MAP = {
    "Air Compressor Systems": {
        "seo_topic": "Industrial Air Compressor Solutions",
        "buyer_search_terms": [
            "air compressor manufacturer China",
            "industrial compressor supplier",
            "screw air compressor factory",
            "compressed air system solution",
            "energy saving air compressor",
            "oil free compressor for food industry",
            "compressor spare parts wholesale",
        ],
        "industry_pages": [
            "food-beverage-compressed-air",
            "pharmaceutical-oil-free-air",
            "textile-compressed-air-system",
            "automotive-compressed-air-solution",
        ],
    },
    "Hydraulic Systems": {
        "seo_topic": "Industrial Hydraulic System Solutions",
        "buyer_search_terms": [
            "hydraulic system manufacturer China",
            "hydraulic power unit supplier",
            "hydraulic pump factory price",
            "custom hydraulic manifold",
            "electro-hydraulic control system",
            "hydraulic cylinder manufacturer",
        ],
        "industry_pages": [
            "construction-machinery-hydraulics",
            "mining-equipment-hydraulic-systems",
            "marine-hydraulic-solutions",
            "industrial-press-hydraulic-systems",
        ],
    },
    "Pneumatic Automation": {
        "seo_topic": "Pneumatic Automation Components",
        "buyer_search_terms": [
            "pneumatic cylinder supplier China",
            "solenoid valve manufacturer",
            "pneumatic automation components",
            "air preparation unit FRL",
            "pneumatic gripper for robot",
            "factory automation pneumatic",
        ],
        "industry_pages": [
            "factory-automation-pneumatics",
            "packaging-machine-pneumatic",
            "automotive-assembly-pneumatic",
        ],
    },
    "Industrial Filtration": {
        "seo_topic": "Industrial Filtration & Dust Collection",
        "buyer_search_terms": [
            "industrial dust collector manufacturer China",
            "filter cartridge supplier",
            "baghouse filter system",
            "HEPA filter for factory",
            "oil mist collector industrial",
            "dust collection system design",
        ],
        "industry_pages": [
            "cement-plant-dust-collection",
            "woodworking-dust-extraction",
            "steel-mill-filtration",
            "pharmaceutical-cleanroom-filtration",
        ],
    },
    "Pumps & Fluid Handling": {
        "seo_topic": "Industrial Pump & Fluid Handling Equipment",
        "buyer_search_terms": [
            "industrial pump manufacturer China",
            "centrifugal pump supplier",
            "chemical pump factory",
            "water pump wholesale",
            "pump spare parts supplier",
            "custom pump skid system",
        ],
        "industry_pages": [
            "chemical-process-pumps",
            "water-treatment-pumping",
            "oil-gas-transfer-pumps",
            "mining-dewatering-pumps",
        ],
    },
    "Valves & Flow Control": {
        "seo_topic": "Industrial Valve & Flow Control Solutions",
        "buyer_search_terms": [
            "industrial valve manufacturer China",
            "ball valve wholesale price",
            "butterfly valve supplier",
            "control valve with actuator",
            "stainless steel valve factory",
            "pipeline valve solution",
        ],
        "industry_pages": [
            "oil-gas-pipeline-valves",
            "water-treatment-valves",
            "chemical-process-valves",
            "hvac-control-valves",
        ],
    },
    "Mechanical Transmission": {
        "seo_topic": "Mechanical Power Transmission Components",
        "buyer_search_terms": [
            "bearing supplier China",
            "industrial gear manufacturer",
            "shaft coupling wholesale",
            "mechanical seal supplier",
            "power transmission components",
            "replacement bearing cross reference",
        ],
        "industry_pages": [
            "mining-conveyor-bearings",
            "wind-turbine-gearbox-components",
            "pump-mechanical-seals",
            "motor-replacement-bearings",
        ],
    },
    "Industrial Automation & Control": {
        "seo_topic": "Industrial Automation & Control Systems",
        "buyer_search_terms": [
            "PLC controller supplier China",
            "industrial sensor manufacturer",
            "VFD drive factory price",
            "HMI touch panel supplier",
            "industrial automation components",
            "smart factory solution China",
        ],
        "industry_pages": [
            "smart-factory-automation",
            "industry-4-0-solutions",
            "machine-retrofit-automation",
            "process-control-systems",
        ],
    },
}

# ============================================================
# GENERATION
# ============================================================

supply_results = []
procurement_list = []
capability_list = []
seo_list = []

for r in results:
    aid = r["asset_id"]
    pred = r["prediction"]
    st = pred["system_type"]
    cat = pred.get("category")
    brand = pred.get("brand")

    if st is None:
        # Factory scenes or unknown → minimal supply intelligence
        at = pred["asset_type"]
        if at == "factory":
            need = "Factory/manufacturing facility visual asset — for About Us / Capabilities page, not product procurement"
            kw = ["manufacturing factory China", "industrial facility tour"]
            supplier_type = "Manufacturing Facility"
            capability = ["Factory Infrastructure", "Production Line Setup"]
        else:
            need = "Asset requires manual review before procurement language generation"
            kw = []
            supplier_type = "TBD"
            capability = []
    else:
        key = (st, cat) if cat else (st, None)
        # Try exact match, fallback to system-only
        if key in PROCUREMENT_MAP:
            pm = PROCUREMENT_MAP[key]
        else:
            # Find first match for this system
            pm = None
            for (sk, ck), v in PROCUREMENT_MAP.items():
                if sk == st:
                    pm = v
                    break
            if pm is None:
                pm = {
                    "buyer_need": f"Industrial {st} — equipment/component procurement",
                    "purchase_keywords": [f"{st.lower()} supplier China"],
                    "replacement_scenarios": ["Equipment replacement / new installation"],
                    "compatible_equipment": [],
                    "buyer_questions": ["Specification requirements?"],
                }

        need = pm["buyer_need"]
        kw = pm["purchase_keywords"]
        supplier_type = CAPABILITY_MAP.get(st, {}).get("supplier_type", f"{st} Supplier")
        capability = CAPABILITY_MAP.get(st, {}).get("manufacturing_capability", [])

    # Build procurement profile
    pp = {
        "asset_id": aid,
        "system_type": st,
        "category": cat,
        "brand": brand,
        "procurement_profile": {
            "buyer_need": need,
            "purchase_keywords": kw if st else [],
            "replacement_scenarios": pm["replacement_scenarios"] if (st and pm) else [],
            "compatible_equipment": pm["compatible_equipment"] if (st and pm) else [],
            "buyer_questions": pm["buyer_questions"] if (st and pm) else [],
        } if st else {
            "buyer_need": need,
            "purchase_keywords": kw,
            "replacement_scenarios": [],
            "compatible_equipment": [],
            "buyer_questions": [],
        },
    }
    supply_results.append(pp)

    # Procurement mapping
    procurement_list.append({
        "asset_id": aid,
        "system_type": st,
        "procurement_readiness": "ready" if st else "not_applicable",
        "buyer_need_summary": need[:100],
    })

    # Capability mapping
    if st:
        cap_data = CAPABILITY_MAP.get(st, {})
        capability_list.append({
            "asset_id": aid,
            "system_type": st,
            "supplier_type": supplier_type,
            "manufacturing_capability": capability,
            "industry_scope": cap_data.get("industry_scope", []),
            "export_potential": cap_data.get("export_potential", "Medium"),
        })
    else:
        capability_list.append({
            "asset_id": aid,
            "system_type": None,
            "supplier_type": None,
            "manufacturing_capability": [],
            "industry_scope": [],
            "export_potential": "N/A",
        })

    # SEO mapping
    if st:
        seo_data = SEO_MAP.get(st, {})
        seo_list.append({
            "asset_id": aid,
            "system_type": st,
            "seo_topic": seo_data.get("seo_topic", f"{st} Solutions"),
            "buyer_search_terms": seo_data.get("buyer_search_terms", []),
            "industry_pages": seo_data.get("industry_pages", []),
        })
    else:
        at = pred["asset_type"]
        seo_list.append({
            "asset_id": aid,
            "system_type": None,
            "seo_topic": "Manufacturing Facility" if at == "factory" else "TBD",
            "buyer_search_terms": [],
            "industry_pages": [],
        })

# ============================================================
# SAVE
# ============================================================

with open(OUT_DIR / "supply-results.json", "w", encoding="utf-8") as f:
    json.dump(supply_results, f, ensure_ascii=False, indent=2)

with open(OUT_DIR / "procurement-mapping.json", "w", encoding="utf-8") as f:
    json.dump(procurement_list, f, ensure_ascii=False, indent=2)

with open(OUT_DIR / "partner-capability.json", "w", encoding="utf-8") as f:
    json.dump(capability_list, f, ensure_ascii=False, indent=2)

with open(OUT_DIR / "seo-semantic-map.json", "w", encoding="utf-8") as f:
    json.dump(seo_list, f, ensure_ascii=False, indent=2)

# ============================================================
# STATS
# ============================================================

proc_ready = sum(1 for p in procurement_list if p["procurement_readiness"] == "ready")
cap_ready = sum(1 for c in capability_list if c["system_type"])
seo_ready = sum(1 for s in seo_list if s["system_type"])

high_value_systems = Counter(
    r["prediction"]["system_type"] for r in results
    if r["prediction"]["system_type"]
).most_common(5)

print(f"Supply Intelligence Generated:")
print(f"  Procurement-ready: {proc_ready}/{len(results)}")
print(f"  Capability-tagged:  {cap_ready}/{len(results)}")
print(f"  SEO-mapped:         {seo_ready}/{len(results)}")
print(f"  High-value systems: {high_value_systems}")
