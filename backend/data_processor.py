import json
import re

def parse_data(txt_file):
    with open(txt_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    roles = []
    current_role = None
    section = None
    
    # Skipping the first few lines of header
    for line in lines[5:]:
        line = line.strip()
        if not line:
            continue
            
        # Check if line is a role header
        if re.match(r'^[A-Za-z\s/()\-]+$', line) and len(line) < 50 and not line.startswith("Tier") and line not in ["Company Type", "Fresher (0-2y)", "Mid-Senior (5y+)", "Global:", "India:"]:
            if current_role:
                roles.append(current_role)
            current_role = {
                "role_name": line,
                "role_vibe": "",
                "technical_workflow": [],
                "market_status": {},
                "salary_matrix": {},
                "targeted_companies": {},
                "success_roadmap": [],
                "learning_resources": []
            }
            continue
            
        if not current_role:
            continue
            
        # Check section headers
        if line.startswith("1. The Role Vibe:"):
            section = "vibe"
            current_role["role_vibe"] = line.split(":", 1)[1].strip()
            continue
        elif line.startswith("2. Technical Workflow:"):
            section = "workflow"
            continue
        elif line.startswith("3. Market Status"):
            section = "market"
            continue
        elif line.startswith("4. Salary Matrix"):
            section = "salary"
            continue
        elif line.startswith("5. Targeted Companies:"):
            section = "companies"
            continue
        elif line.startswith("6. The Success Roadmap:"):
            section = "roadmap"
            continue
        elif line.startswith("7. Learning Resources:"):
            section = "resources"
            continue
            
        # Parse based on section
        if section == "workflow":
            if line and line[0].isdigit() and ". " in line:
                current_role["technical_workflow"].append(line.split(". ", 1)[1])
        elif section == "market":
            if line.startswith("Trend:"):
                current_role["market_status"]["trend"] = line.split(":", 1)[1].strip()
            elif line.startswith("The Why:"):
                current_role["market_status"]["why"] = line.split(":", 1)[1].strip()
        elif section == "roadmap":
            if line and line[0].isdigit() and ". " in line:
                current_role["success_roadmap"].append(line.split(". ", 1)[1])
        elif section == "companies":
            if line.startswith("Global:"):
                current_role["targeted_companies"]["global"] = [c.strip() for c in line.split(":", 1)[1].split(",")]
            elif line.startswith("India:"):
                current_role["targeted_companies"]["india"] = [c.strip() for c in line.split(":", 1)[1].split(",")]
        elif section == "resources":
            current_role["learning_resources"].extend([r.strip() for r in line.split(";") if r.strip()])

    if current_role:
        roles.append(current_role)
        
    return roles

def apply_corrections(roles):
    def compute_demand_score(role):
        trend = role.get("market_status", {}).get("trend", "").lower()
        why = role.get("market_status", {}).get("why", "").lower()
        name = role.get("role_name", "").lower()
        signal_text = f"{trend} {why} {name}"

        score = 72

        if "booming" in signal_text:
            score += 11
        if "emerging" in signal_text:
            score += 7
        if "specialist" in signal_text or "niche" in signal_text:
            score += 3
        if "hiring heavily" in signal_text or "fastest-growing" in signal_text:
            score += 6
        if "strategic" in signal_text or "critical" in signal_text:
            score += 4

        role_boosts = [
            ("ai", 5),
            ("machine learning", 5),
            ("data", 4),
            ("cloud", 4),
            ("security", 5),
            ("devops", 3),
            ("platform", 3),
            ("robotics", 2),
            ("semiconductor", 3),
            ("game", -2),
            ("support", -3),
        ]
        for keyword, delta in role_boosts:
            if keyword in signal_text:
                score += delta

        return max(68, min(96, score))

    for role in roles:
        name = role["role_name"].lower()
        
        # 2026 Demand Scoring
        role["market_confidence_score"] = compute_demand_score(role)
            
        # Localized Academic Mapping
        role["academic_mapping"] = {
            "SPPU_Semester_3": ["Discrete Mathematics", "Data Structures", "Object-Oriented Programming", "Digital Electronics"],
            "SPPU_Semester_4": ["Computer Graphics", "Database Management Systems", "Software Engineering", "Microprocessor"],
            "KJCOEMR_Focus": "Apply theoretical subjects directly to practical project milestones in the roadmap."
        }
        
        # Game Developer
        if "game developer" in name:
            role["technical_workflow"] = [
                "Translate game design docs into core mechanics, physics, and gameplay loops.",
                "Build rendering pipelines and optimize 3D assets.",
                "Implement AI behaviors and network synchronization.",
                "Profile and debug memory/CPU constraints on target platforms.",
                "Iterate rapidly on playtest feedback."
            ]
            role["success_roadmap"] = [
                "C++, C#, linear algebra, physics, and advanced data structures.",
                "Unity / Unreal Engine 5, ECS patterns, memory management.",
                "Shader programming, graphics APIs (Vulkan/DirectX), and multiplayer networking.",
                "A polished, performant playable prototype demonstrating core mechanics."
            ]
            
        # Hardware Architect
        elif "hardware architect" in name or "neural hardware" in name:
            role["success_roadmap"] = [
                "Digital logic, computer architecture, C/C++, physics, and electronics.",
                "Verilog/SystemVerilog, simulation, synthesis, embedded C.",
                "Timing closure, power optimization, verification (UVM), and system integration.",
                "A hardware block prototype tested via simulation/FPGA with an engineering report."
            ]
            
        # The Creative Bridge
        elif "ui/ux" in name or "creative technologist" in name or "design" in name:
            role["success_roadmap"] = [
                "HTML/CSS/JavaScript, 2D Animation principles, typography, and color theory.",
                "Figma, Adobe Creative Suite, Framer, and Graphic Design fundamentals.",
                "User research, wireframing, interactive prototyping, and accessibility.",
                "A comprehensive case study and interactive portfolio demonstrating the 'Symphony' aesthetic."
            ]
            
        # GenAI Deep-Dive
        elif "ai" in name or "machine learning" in name or "data scientist" in name or "prompt" in name:
            role["success_roadmap"] = [
                "Python, statistics, linear algebra, data structures, and software basics.",
                "PyTorch fine-tuning, LangChain, Vector Databases (Pinecone/Milvus), and Hugging Face.",
                "Evaluation design, RAG architecture, model alignment, optimization, and deployment.",
                "A production GenAI product with metrics, tracing, logs, and a clean demo."
            ]

        # Executive Roles
        elif "ciso" in name or "cto" in name or "architect" in name:
            role["technical_workflow"] = [
                "Define technology strategy and long-term architectural vision.",
                "Manage enterprise risk, compliance, and governance frameworks.",
                "Lead cross-functional engineering teams and allocate budgets.",
                "Ensure scalability, security, and resilience of critical systems."
            ]
            
    return roles

if __name__ == "__main__":
    txt_file = r"C:\Users\parde\.gemini\antigravity\brain\639ddc2a-a7ca-4f60-90e1-d8438ab62a17\scratch\extracted_text.txt"
    roles = parse_data(txt_file)
    roles = apply_corrections(roles)
    with open(r"e:\Pathfinder\backend\roles_db.json", "w", encoding="utf-8") as f:
        json.dump(roles, f, indent=4)
    print(f"Processed {len(roles)} roles and saved to roles_db.json")
