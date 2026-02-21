import { useState, useEffect, useCallback } from "react";

// YouTube search queries for every exercise
const V = {
  // REHAB
  "Quad Sets (isometric)": "quad+sets+knee+rehab+physical+therapy",
  "Quad Sets": "quad+sets+knee+rehab+physical+therapy",
  "Straight Leg Raises": "straight+leg+raise+knee+rehab+exercise",
  "SLR (ankle wt 2-3 lb)": "straight+leg+raise+ankle+weight+knee+rehab",
  "SLR (ankle wt)": "straight+leg+raise+ankle+weight+knee+rehab",
  "SLR (3-5 lb)": "straight+leg+raise+ankle+weight+knee+rehab",
  "Heel Slides": "heel+slides+knee+rehab+exercise+physical+therapy",
  "Heel Slides (deeper)": "heel+slides+knee+rehab+range+of+motion",
  "Heel Slides (full ROM)": "heel+slides+knee+full+range+of+motion",
  "Slant Board Static Hold": "slant+board+squat+hold+knee+rehab+VMO",
  "Slant Board Squat (Â¼ depth)": "slant+board+quarter+squat+knee+rehab",
  "Slant Board Squat (Â¼)": "slant+board+quarter+squat+knee+rehab",
  "Slant Board Squat (Â½)": "slant+board+half+squat+knee+rehab+VMO",
  "Slant Board Squat (full)": "slant+board+full+squat+knees+over+toes",
  "Slant Board Squats": "slant+board+squat+knees+over+toes+guy",
  "Slant Board Squats (BW)": "slant+board+bodyweight+squat+VMO",
  "Slant Board Squats (tempo)": "slant+board+tempo+squat+eccentric",
  "Slant Board Hold (deeper)": "slant+board+squat+hold+knee+VMO",
  "Slant Board Squats + TKEs": "slant+board+squat+terminal+knee+extension",
  "Slant Board Goblet Squat": "slant+board+goblet+squat+dumbbell",
  "Single-Leg Slant Hold": "single+leg+slant+board+squat+hold",
  "Ankle Pumps": "ankle+pumps+exercise+rehab+circulation",
  "TKEs (band)": "terminal+knee+extension+band+exercise+rehab",
  "TKEs": "terminal+knee+extension+band+exercise+VMO",
  "TKEs (heavier band)": "terminal+knee+extension+heavy+band",
  "Standing Calf Raises": "standing+calf+raise+proper+form",
  "Single-Leg Calf Raises": "single+leg+calf+raise+form",
  "Calf Raises (weighted)": "weighted+standing+calf+raise+form",
  "Side-Lying Hip Abduction": "side+lying+hip+abduction+exercise+form",
  "Hip Abduction (ankle wt)": "side+lying+hip+abduction+ankle+weight",
  "Clamshells": "clamshell+exercise+resistance+band+glute",
  "Clamshells (band)": "banded+clamshell+exercise+glute+activation",
  "Clamshells (heavier band)": "heavy+band+clamshell+exercise+glutes",
  "Prone Knee Flexion": "prone+knee+flexion+exercise+rehab",
  "Prone Knee Flexion (wt)": "prone+knee+flexion+ankle+weight+exercise",
  "Single-Leg Balance": "single+leg+balance+exercise+knee+rehab",
  "Balance (unstable)": "single+leg+balance+unstable+surface+rehab",
  "Balance (eyes closed)": "single+leg+balance+eyes+closed+proprioception",
  "Foam Rolling": "foam+rolling+legs+quads+IT+band+recovery",
  "Foam Rolling + Stretching": "foam+rolling+full+body+stretching+routine",
  "Gentle Stretching": "lower+body+stretching+routine+hamstrings+hip+flexors",
  "Stretching": "lower+body+stretching+hamstrings+hip+flexors+quads",
  "Stretching + Mobility": "lower+body+mobility+routine+hip+knee+ankle",
  "Step-Ups (6 in)": "step+up+exercise+knee+rehab+form",
  "Step-Ups (8 in)": "dumbbell+step+up+exercise+form",
  "Step-Ups (8 in, light DB)": "dumbbell+step+up+exercise+form",
  "Dynamic warm-up": "dynamic+warm+up+routine+before+workout",
  "Dynamic warm-up + TKEs": "dynamic+warm+up+terminal+knee+extension",
  "Full W1 rehab circuit": "knee+rehab+circuit+quad+sets+straight+leg+raise",
  "KNEE SELF-ASSESSMENT": null,
  "Ice + Elevation": null,
  "Full rehab circuit (light)": null,
  "Full rehab circuit": null,
  "Light rehab circuit": null,
  // WORKOUT
  "DB Bench Press": "dumbbell+bench+press+proper+form+technique",
  "DB Shoulder Press (seated)": "seated+dumbbell+shoulder+press+form",
  "DB Shoulder Press": "dumbbell+overhead+shoulder+press+form",
  "DB Flyes": "dumbbell+chest+fly+proper+form",
  "DB Lateral Raises": "dumbbell+lateral+raise+proper+form",
  "DB Lat Raises (drop set)": "dumbbell+lateral+raise+drop+set+technique",
  "DB Incline Press": "dumbbell+incline+bench+press+form",
  "DB Arnold Press": "dumbbell+arnold+press+proper+form",
  "DB Front Raises": "dumbbell+front+raise+proper+form",
  "DB Upright Rows": "dumbbell+upright+row+proper+form",
  "Push-Ups": "push+up+proper+form+technique",
  "Push-Ups (weighted/deficit)": "deficit+push+up+weighted+vest+form",
  "Push-Ups (deficit/weighted)": "deficit+push+up+weighted+form",
  "Push-Up Variations": "push+up+variations+diamond+wide+deficit",
  "Push-Ups (burnout)": "push+up+burnout+set+to+failure",
  "Push-Up Burnout": "push+up+burnout+max+reps",
  "Pull-Ups": "pull+up+proper+form+beginner+to+advanced",
  "Pull-Ups (weighted)": "weighted+pull+up+form+technique",
  "Pull-Ups (max weighted)": "weighted+pull+up+max+reps+form",
  "DB Bent-Over Rows": "dumbbell+bent+over+row+proper+form",
  "DB Single-Arm Rows": "single+arm+dumbbell+row+form",
  "DB Rows": "dumbbell+row+proper+form+technique",
  "DB Rows (heavy)": "heavy+dumbbell+row+form+technique",
  "DB Reverse Flyes": "dumbbell+reverse+fly+rear+delt+form",
  "DB Bicep Curls": "dumbbell+bicep+curl+proper+form",
  "DB Curls (heavy)": "heavy+dumbbell+bicep+curl+form",
  "DB Curls": "dumbbell+bicep+curl+proper+form",
  "DB Curls (21s)": "21s+bicep+curl+technique+how+to",
  "DB Hammer Curls": "dumbbell+hammer+curl+proper+form",
  "DB Hammer Curls (heavy)": "heavy+dumbbell+hammer+curl+form",
  "DB Concentration Curls": "dumbbell+concentration+curl+form",
  "DB Shrugs": "dumbbell+shrug+proper+form+technique",
  "DB Tricep Kickbacks": "dumbbell+tricep+kickback+proper+form",
  "DB OH Tricep Extension": "dumbbell+overhead+tricep+extension+form",
  "DB Tricep OH Extension": "dumbbell+overhead+tricep+extension+form",
  "DB Romanian Deadlifts": "dumbbell+romanian+deadlift+RDL+form",
  "DB Walking Lunges (short)": "dumbbell+walking+lunge+proper+form",
  "DB Walking Lunges": "dumbbell+walking+lunge+form+technique",
  "DB Split Squats": "dumbbell+split+squat+proper+form",
  "Glute Bridges": "glute+bridge+exercise+proper+form",
  "Glute Bridges (weighted)": "weighted+glute+bridge+dumbbell+hip+thrust",
  "Glute Bridges (heavy)": "heavy+weighted+glute+bridge+hip+thrust",
  "Ankle Wt Leg Curls": "prone+hamstring+curl+ankle+weight+exercise",
  "Standing Calf Raises (wt)": "weighted+standing+calf+raise+dumbbells",
  "Single-Leg Calf Raises (wt)": "single+leg+weighted+calf+raise+form",
  "Weighted Calf Raises": "weighted+calf+raise+dumbbell+form",
  "Sled Pull (light)": "sled+push+pull+exercise+form+technique",
  "Sled Pull (moderate)": "sled+push+pull+exercise+form",
  "Sled Pull (heavier)": "heavy+sled+pull+push+exercise",
  "Sled Pull (heavy)": "heavy+sled+pull+push+leg+workout",
  "Sled Pull (easy/mod)": "sled+pull+recovery+workout",
  "Sled Pull (MAX TEST)": "heavy+sled+pull+max+weight+test",
  "Sled Backward Drag (light)": "backward+sled+drag+knees+over+toes+guy+VMO",
  "Sled Backward Drag": "backward+sled+drag+knees+over+toes+VMO",
  "Sled Backward Drag (mod-hvy)": "backward+sled+drag+heavy+knees+over+toes",
  "Sled Backward Drag (heavy)": "backward+sled+drag+heavy+knees+over+toes+guy",
  "Sled Backward Drag (MAX)": "backward+sled+drag+max+weight+knees+over+toes",
  "Wall Ball Slams (no squat)": "medicine+ball+slam+exercise+form",
  "Wall Ball Slams": "medicine+ball+slam+exercise+form",
  "Wall Ball Catches": "wall+ball+catch+throw+exercise",
  "Wall Ball Russian Twists": "russian+twist+medicine+ball+exercise",
  "Plank Hold": "plank+exercise+proper+form+core",
  "Plank to Push-Up": "plank+to+push+up+exercise+form",
  "Side Plank": "side+plank+exercise+proper+form",
  "Dead Bug": "dead+bug+exercise+core+stability+form",
  "Spinner Bike": null,
  "Ski-Erg": "ski+erg+technique+proper+form",
  "Rower": "rowing+machine+proper+technique+form",
  "Rower â€“ 2000m Time Trial": "2000m+rowing+time+trial+strategy+pace",
  "CIRCUIT: 4 Rounds (45s/15s)": "circuit+training+upper+body+workout",
  "â€“ DB Shoulder Press": "dumbbell+shoulder+press+form",
  "â€“ Pull-Ups": "pull+up+proper+form",
  "â€“ Push-Ups": "push+up+proper+form",
  "â€“ DB Curls": "dumbbell+bicep+curl+form",
  "â€“ Wall Ball Slams": "medicine+ball+slam+exercise",
  "â€“ Plank Hold": "plank+exercise+proper+form",
};

const WEEKS = [
  { week: 1, theme: "Foundation & Activation", focus: "Reduce inflammation, restore ROM, activate quads.",
    days: [
      { day: "Monday", label: "Upper Push", rehab: [
        { n: "Quad Sets (isometric)", s: "3Ã—15", t: "Hold 5s, press knee into floor" },
        { n: "Straight Leg Raises", s: "3Ã—12 ea", t: "Slow, brace core" },
        { n: "Heel Slides", s: "3Ã—15", t: "Pain-free range only" },
        { n: "Slant Board Static Hold", s: "3Ã—15s", t: "Slight bend, feel VMO" },
        { n: "Ankle Pumps", s: "2Ã—20", t: "For circulation" },
      ], workout: [
        { n: "DB Bench Press", s: "4Ã—10", t: "25-30 lb" },
        { n: "DB Shoulder Press (seated)", s: "3Ã—10", t: "20-25 lb" },
        { n: "DB Flyes", s: "3Ã—12", t: "15-20 lb, slow eccentric" },
        { n: "DB Lateral Raises", s: "3Ã—12", t: "10-15 lb" },
        { n: "Push-Ups", s: "3Ã—max", t: "Bodyweight" },
      ], cardio: "Air Bike â€“ 10 min easy (arms emphasis)" },
      { day: "Tuesday", label: "Cardio", rehab: [
        { n: "Quad Sets", s: "3Ã—15", t: "" },
        { n: "Straight Leg Raises", s: "3Ã—12", t: "" },
        { n: "Standing Calf Raises", s: "3Ã—15", t: "Hold wall" },
        { n: "Slant Board Squat (Â¼ depth)", s: "2Ã—10", t: "Pain-free only" },
        { n: "Ice + Elevation", s: "15 min", t: "Post-session" },
      ], workout: [
        { n: "Spinner Bike", s: "20 min", t: "Low resistance, monitor knee" },
        { n: "Ski-Erg", s: "5 min", t: "Arms-dominant, light" },
      ], cardio: "" },
      { day: "Wednesday", label: "Upper Pull", rehab: [
        { n: "Quad Sets", s: "3Ã—15", t: "" },
        { n: "Heel Slides", s: "3Ã—15", t: "" },
        { n: "Side-Lying Hip Abduction", s: "3Ã—12 ea", t: "Hip stabilizers" },
        { n: "Clamshells", s: "3Ã—15 ea", t: "Band optional" },
        { n: "Slant Board Static Hold", s: "3Ã—20s", t: "Slightly deeper" },
      ], workout: [
        { n: "Pull-Ups", s: "4Ã—max", t: "Band assist if needed" },
        { n: "DB Bent-Over Rows", s: "4Ã—10 ea", t: "30-35 lb" },
        { n: "DB Bicep Curls", s: "3Ã—12", t: "15-20 lb" },
        { n: "DB Hammer Curls", s: "3Ã—12", t: "15-20 lb" },
        { n: "DB Shrugs", s: "3Ã—15", t: "40-50 lb" },
      ], cardio: "Rower â€“ 8 min easy" },
      { day: "Thursday", label: "Active Recovery", rehab: [
        { n: "Full rehab circuit (light)", s: "1Ã— through", t: "Monday exercises, easy" },
        { n: "Foam Rolling", s: "10 min", t: "Quads, calves, IT band" },
        { n: "Gentle Stretching", s: "10 min", t: "Hamstrings, hip flexors" },
      ], workout: [
        { n: "Spinner Bike", s: "15 min", t: "Very easy, recovery" },
      ], cardio: "" },
      { day: "Friday", label: "Shoulders & Arms", rehab: [
        { n: "Quad Sets", s: "3Ã—15", t: "" },
        { n: "Straight Leg Raises", s: "3Ã—12", t: "" },
        { n: "Standing Calf Raises", s: "3Ã—15", t: "" },
        { n: "Slant Board Squat (Â¼)", s: "2Ã—10", t: "Focus on VMO" },
        { n: "Prone Knee Flexion", s: "2Ã—12", t: "Face down, gentle bend" },
      ], workout: [
        { n: "DB Arnold Press", s: "3Ã—10", t: "20-25 lb" },
        { n: "DB Front Raises", s: "3Ã—12", t: "10-15 lb" },
        { n: "DB Tricep Kickbacks", s: "3Ã—12 ea", t: "15 lb" },
        { n: "DB OH Tricep Extension", s: "3Ã—12", t: "20-25 lb" },
        { n: "Wall Ball Slams (no squat)", s: "3Ã—10", t: "Light, minimal knee bend" },
      ], cardio: "Ski-Erg â€“ 8 min moderate" },
      { day: "Saturday", label: "Leg Day (Knee-Safe)", rehab: [
        { n: "Full rehab circuit", s: "2Ã— through", t: "All week's exercises" },
      ], workout: [
        { n: "Sled Pull (light)", s: "4Ã—40 yd", t: "Smooth gait" },
        { n: "DB Romanian Deadlifts", s: "3Ã—10", t: "25-30 lb" },
        { n: "Glute Bridges", s: "3Ã—15", t: "BW or light DB" },
        { n: "Standing Calf Raises (wt)", s: "3Ã—15", t: "Hold dumbbells" },
        { n: "Side-Lying Hip Abduction", s: "3Ã—12 ea", t: "Ankle weight" },
      ], cardio: "Air Bike â€“ 10 min easy" },
      { day: "Sunday", label: "Rest", rehab: [], workout: [], cardio: "Complete rest. Ice if needed." },
    ]},
  { week: 2, theme: "Building Tolerance", focus: "Progress ROM, add resistance, deepen slant board.",
    days: [
      { day: "Monday", label: "Upper Push", rehab: [
        { n: "Quad Sets", s: "3Ã—20", t: "" },
        { n: "SLR (ankle wt 2-3 lb)", s: "3Ã—12", t: "Progress from W1" },
        { n: "Heel Slides (deeper)", s: "3Ã—15", t: "More flexion" },
        { n: "TKEs (band)", s: "3Ã—15", t: "Light band, last 30Â°" },
        { n: "Slant Board Squat (Â½)", s: "3Ã—10", t: "BW, ~45Â°" },
      ], workout: [
        { n: "DB Bench Press", s: "4Ã—10", t: "+5 lb from W1" },
        { n: "DB Incline Press", s: "3Ã—10", t: "30-45Â° bench" },
        { n: "DB Flyes", s: "3Ã—12", t: "" },
        { n: "Push-Ups (weighted/deficit)", s: "3Ã—max", t: "" },
        { n: "DB Lateral Raises", s: "3Ã—15", t: "" },
      ], cardio: "Air Bike â€“ 12 min moderate" },
      { day: "Tuesday", label: "Cardio", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "" }, { n: "SLR (ankle wt)", s: "3Ã—12", t: "" },
        { n: "Hip Abduction (ankle wt)", s: "3Ã—12 ea", t: "" }, { n: "Clamshells (band)", s: "3Ã—15 ea", t: "" },
        { n: "Slant Board Hold (deeper)", s: "3Ã—20s", t: "~45Â° bend" },
      ], workout: [
        { n: "Spinner Bike", s: "25 min", t: "Moderate" }, { n: "Rower", s: "5 min", t: "Cooldown" },
      ], cardio: "" },
      { day: "Wednesday", label: "Upper Pull", rehab: [
        { n: "Quad Sets", s: "3Ã—20", t: "" }, { n: "Heel Slides", s: "3Ã—15", t: "" },
        { n: "Prone Knee Flexion (wt)", s: "3Ã—12", t: "Ankle weight" },
        { n: "Slant Board Squat (Â½)", s: "3Ã—12", t: "3s down, 1s up" }, { n: "Calf Raises (weighted)", s: "3Ã—15", t: "" },
      ], workout: [
        { n: "Pull-Ups", s: "4Ã—max", t: "" }, { n: "DB Single-Arm Rows", s: "4Ã—10 ea", t: "35-40 lb" },
        { n: "DB Reverse Flyes", s: "3Ã—12", t: "10-15 lb" }, { n: "DB Bicep Curls", s: "3Ã—12", t: "" },
        { n: "DB Hammer Curls", s: "3Ã—12", t: "" },
      ], cardio: "Rower â€“ 10 min moderate" },
      { day: "Thursday", label: "Active Recovery", rehab: [
        { n: "Full rehab circuit (light)", s: "1Ã—", t: "" }, { n: "Foam Rolling", s: "10 min", t: "" },
        { n: "Stretching", s: "10 min", t: "Hams, hip flexors, quads" },
      ], workout: [{ n: "Spinner Bike", s: "20 min", t: "Recovery" }], cardio: "" },
      { day: "Friday", label: "Shoulders & Core", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "" }, { n: "SLR (ankle wt)", s: "3Ã—15", t: "" },
        { n: "Slant Board Squats", s: "2Ã—12", t: "Maintenance" }, { n: "Clamshells (band)", s: "3Ã—15", t: "" },
      ], workout: [
        { n: "DB Shoulder Press", s: "4Ã—10", t: "" }, { n: "DB Upright Rows", s: "3Ã—12", t: "" },
        { n: "DB Front Raises", s: "3Ã—12", t: "" }, { n: "Plank Hold", s: "3Ã—30-45s", t: "" },
        { n: "Dead Bug", s: "3Ã—10 ea", t: "Core stability" },
      ], cardio: "Ski-Erg â€“ 10 min moderate" },
      { day: "Saturday", label: "Leg Day (Modified)", rehab: [
        { n: "Full rehab circuit", s: "2Ã— through", t: "" },
      ], workout: [
        { n: "Sled Pull (moderate)", s: "5Ã—40 yd", t: "+weight" },
        { n: "Sled Backward Drag (light)", s: "3Ã—30 yd", t: "VMO builder" },
        { n: "DB Romanian Deadlifts", s: "4Ã—10", t: "30-35 lb" },
        { n: "Glute Bridges (weighted)", s: "3Ã—15", t: "20-25 lb" },
        { n: "Ankle Wt Leg Curls", s: "3Ã—12", t: "" },
        { n: "Slant Board Squats (tempo)", s: "3Ã—10", t: "3s eccentric" },
      ], cardio: "Air Bike â€“ 10 min easy" },
      { day: "Sunday", label: "Rest", rehab: [], workout: [], cardio: "Complete rest." },
    ]},
  { week: 3, theme: "Strength Building", focus: "Full-depth slant board, heavier sled, functional moves.",
    days: [
      { day: "Monday", label: "Upper Push (Heavier)", rehab: [
        { n: "TKEs (heavier band)", s: "3Ã—15", t: "" }, { n: "SLR (3-5 lb)", s: "3Ã—15", t: "" },
        { n: "Slant Board Squat (full)", s: "3Ã—12", t: "BW, full ROM" },
        { n: "Single-Leg Slant Hold", s: "3Ã—10s ea", t: "Stability" },
        { n: "Single-Leg Balance", s: "3Ã—30s ea", t: "Proprioception" },
      ], workout: [
        { n: "DB Bench Press", s: "4Ã—8", t: "Heavier" }, { n: "DB Incline Press", s: "4Ã—8", t: "" },
        { n: "DB Flyes", s: "3Ã—12", t: "" }, { n: "DB Shoulder Press", s: "3Ã—10", t: "" },
        { n: "Push-Ups (deficit/weighted)", s: "3Ã—max", t: "" },
      ], cardio: "Air Bike â€“ 12 min intervals" },
      { day: "Tuesday", label: "Cardio Progression", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "" }, { n: "Slant Board Squats", s: "2Ã—15", t: "Warm-up" },
        { n: "Hip Abduction (ankle wt)", s: "3Ã—15 ea", t: "" }, { n: "Clamshells (heavier band)", s: "3Ã—15 ea", t: "" },
      ], workout: [
        { n: "Rower", s: "15 min", t: "Full leg drive" }, { n: "Spinner Bike", s: "15 min", t: "Moderate" },
      ], cardio: "" },
      { day: "Wednesday", label: "Upper Pull (Heavier)", rehab: [
        { n: "Quad Sets", s: "2Ã—20", t: "Maintenance" }, { n: "Heel Slides (full ROM)", s: "2Ã—15", t: "" },
        { n: "Prone Knee Flexion (wt)", s: "3Ã—12", t: "" }, { n: "Single-Leg Calf Raises", s: "3Ã—12 ea", t: "" },
        { n: "Balance (eyes closed)", s: "3Ã—20s ea", t: "" },
      ], workout: [
        { n: "Pull-Ups (weighted)", s: "4Ã—max", t: "" }, { n: "DB Bent-Over Rows", s: "4Ã—8 ea", t: "40-45 lb" },
        { n: "DB Reverse Flyes", s: "3Ã—12", t: "" }, { n: "DB Curls (heavy)", s: "4Ã—8", t: "25 lb" },
        { n: "DB Hammer Curls", s: "3Ã—10", t: "" },
      ], cardio: "Rower â€“ 10 min intervals" },
      { day: "Thursday", label: "Active Recovery", rehab: [
        { n: "Full rehab circuit", s: "1Ã—", t: "Moderate" }, { n: "Foam Rolling", s: "10 min", t: "" },
        { n: "Stretching + Mobility", s: "10 min", t: "" },
      ], workout: [
        { n: "Spinner Bike", s: "20 min", t: "Easy" }, { n: "Wall Ball Catches", s: "3Ã—10", t: "Light" },
      ], cardio: "" },
      { day: "Friday", label: "Arms & Core", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "" }, { n: "Slant Board Squats", s: "2Ã—12", t: "" },
        { n: "Step-Ups (6 in)", s: "2Ã—10 ea", t: "BW" }, { n: "Single-Leg Balance", s: "3Ã—30s ea", t: "" },
      ], workout: [
        { n: "DB Arnold Press", s: "4Ã—10", t: "" }, { n: "DB Tricep OH Extension", s: "3Ã—12", t: "" },
        { n: "DB Concentration Curls", s: "3Ã—10 ea", t: "" }, { n: "Plank Hold", s: "3Ã—45s", t: "" },
        { n: "Side Plank", s: "3Ã—20s ea", t: "" }, { n: "Dead Bug", s: "3Ã—12 ea", t: "" },
      ], cardio: "Ski-Erg â€“ 12 min moderate" },
      { day: "Saturday", label: "Leg Day (Progressive)", rehab: [
        { n: "Full rehab circuit", s: "1Ã—", t: "Warm-up" },
      ], workout: [
        { n: "Sled Pull (heavier)", s: "5Ã—40 yd", t: "Increase load" },
        { n: "Sled Backward Drag", s: "4Ã—30 yd", t: "Moderate â€“ VMO" },
        { n: "Slant Board Goblet Squat", s: "3Ã—10", t: "15-20 lb" },
        { n: "DB Romanian Deadlifts", s: "4Ã—10", t: "35-40 lb" },
        { n: "Glute Bridges (weighted)", s: "4Ã—12", t: "25-30 lb" },
        { n: "Ankle Wt Leg Curls", s: "3Ã—12", t: "" },
        { n: "Single-Leg Calf Raises", s: "3Ã—15 ea", t: "" },
      ], cardio: "Air Bike â€“ 10 min easy" },
      { day: "Sunday", label: "Rest", rehab: [], workout: [], cardio: "Complete rest." },
    ]},
  { week: 4, theme: "Functional Integration", focus: "Rehab = warm-up. Sled staple. Loaded slant board.",
    days: [
      { day: "Monday", label: "Upper Push", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "" }, { n: "Slant Board Squats", s: "3Ã—15", t: "Full depth" },
        { n: "Balance (unstable)", s: "3Ã—30s", t: "" }, { n: "Step-Ups (8 in, light DB)", s: "2Ã—10 ea", t: "" },
      ], workout: [
        { n: "DB Bench Press", s: "4Ã—8", t: "Progress" }, { n: "DB Incline Press", s: "4Ã—8", t: "" },
        { n: "DB Flyes", s: "3Ã—10", t: "" }, { n: "DB Lateral Raises", s: "4Ã—12", t: "" },
        { n: "Push-Up Variations", s: "3Ã—max", t: "Diamond/wide/deficit" },
      ], cardio: "Air Bike â€“ 15 min HIIT" },
      { day: "Tuesday", label: "Cardio HIIT", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "" }, { n: "Slant Board Squats", s: "2Ã—15", t: "Warm-up" },
        { n: "Clamshells (band)", s: "3Ã—15", t: "" },
      ], workout: [
        { n: "Rower", s: "20 min", t: "3 steady / 1 hard Ã—5" }, { n: "Ski-Erg", s: "10 min", t: "Steady" },
      ], cardio: "" },
      { day: "Wednesday", label: "Upper Pull", rehab: [
        { n: "Slant Board Squats", s: "2Ã—15", t: "Warm-up" }, { n: "Single-Leg Calf Raises", s: "3Ã—15 ea", t: "" },
        { n: "Hip Abduction (ankle wt)", s: "3Ã—15", t: "" },
      ], workout: [
        { n: "Pull-Ups (weighted)", s: "5Ã—max", t: "+weight if >10" }, { n: "DB Rows", s: "4Ã—8 ea", t: "45-50 lb" },
        { n: "DB Reverse Flyes", s: "3Ã—12", t: "" }, { n: "DB Curls (21s)", s: "3 sets", t: "7/7/7" },
        { n: "DB Shrugs", s: "3Ã—15", t: "45-50 lb" },
      ], cardio: "Rower â€“ 10 min steady" },
      { day: "Thursday", label: "Active Recovery", rehab: [
        { n: "Light rehab circuit", s: "1Ã—", t: "" }, { n: "Foam Rolling", s: "10 min", t: "" },
        { n: "Stretching + Mobility", s: "15 min", t: "Include knee flexion" },
      ], workout: [{ n: "Spinner Bike", s: "25 min", t: "Easy" }], cardio: "" },
      { day: "Friday", label: "Shoulders, Arms & Core", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "" }, { n: "Slant Board Squats", s: "2Ã—15", t: "" },
        { n: "Step-Ups (8 in)", s: "2Ã—10 ea", t: "" },
      ], workout: [
        { n: "DB Shoulder Press", s: "4Ã—8", t: "Heavier" }, { n: "DB Upright Rows", s: "3Ã—12", t: "" },
        { n: "DB Tricep Kickbacks", s: "3Ã—12 ea", t: "" }, { n: "DB OH Tricep Extension", s: "3Ã—10", t: "" },
        { n: "Plank to Push-Up", s: "3Ã—8", t: "" }, { n: "Wall Ball Russian Twists", s: "3Ã—15 ea", t: "Seated" },
      ], cardio: "Ski-Erg â€“ 12 min intervals" },
      { day: "Saturday", label: "Leg Day (Building)", rehab: [
        { n: "TKEs", s: "3Ã—15", t: "Warm-up" }, { n: "Slant Board Squats (BW)", s: "2Ã—15", t: "" },
      ], workout: [
        { n: "Sled Pull (heavy)", s: "5Ã—40 yd", t: "Push the load" },
        { n: "Sled Backward Drag (mod-hvy)", s: "4Ã—30 yd", t: "VMO builder" },
        { n: "Slant Board Goblet Squat", s: "4Ã—10", t: "20-25 lb" },
        { n: "DB Romanian Deadlifts", s: "4Ã—10", t: "40 lb" },
        { n: "DB Walking Lunges (short)", s: "3Ã—8 ea", t: "15 lb, monitor knee" },
        { n: "Glute Bridges (heavy)", s: "4Ã—12", t: "35 lb" },
        { n: "Single-Leg Calf Raises (wt)", s: "3Ã—12 ea", t: "Hold DB" },
      ], cardio: "Air Bike â€“ 10 min moderate" },
      { day: "Sunday", label: "Rest", rehab: [], workout: [], cardio: "Complete rest." },
    ]},
  { week: 5, theme: "Strength & Conditioning", focus: "Heavy sled. Loaded slant board. Build power.",
    days: [
      { day: "Monday", label: "Upper Push (Heavy)", rehab: [
        { n: "TKEs", s: "2Ã—15", t: "Quick warm-up" }, { n: "Slant Board Squats", s: "2Ã—15", t: "BW warm-up" },
        { n: "Single-Leg Balance", s: "2Ã—30s ea", t: "" },
      ], workout: [
        { n: "DB Bench Press", s: "5Ã—6-8", t: "Heavy, near max" }, { n: "DB Incline Press", s: "4Ã—8", t: "" },
        { n: "DB Flyes", s: "3Ã—12", t: "" }, { n: "DB Shoulder Press", s: "4Ã—8", t: "" },
        { n: "DB Lat Raises (drop set)", s: "3 sets", t: "Heavy, drop twice" },
        { n: "Push-Ups (burnout)", s: "2Ã—max", t: "" },
      ], cardio: "Air Bike â€“ 15 min Tabata" },
      { day: "Tuesday", label: "Cardio Endurance", rehab: [
        { n: "TKEs", s: "2Ã—15", t: "" }, { n: "Slant Board Squats", s: "2Ã—15", t: "" },
        { n: "Clamshells", s: "2Ã—15", t: "" },
      ], workout: [
        { n: "Rower", s: "20 min", t: "Consistent split" }, { n: "Spinner Bike", s: "15 min", t: "Mod-high" },
      ], cardio: "" },
      { day: "Wednesday", label: "Upper Pull (Heavy)", rehab: [
        { n: "TKEs", s: "2Ã—15", t: "" }, { n: "Slant Board Squats", s: "2Ã—15", t: "" },
        { n: "Single-Leg Calf Raises", s: "2Ã—15 ea", t: "" },
      ], workout: [
        { n: "Pull-Ups (weighted)", s: "5Ã—max", t: "Max weight" }, { n: "DB Rows (heavy)", s: "5Ã—6-8 ea", t: "50 lb" },
        { n: "DB Reverse Flyes", s: "3Ã—12", t: "" }, { n: "DB Curls (heavy)", s: "4Ã—8", t: "30 lb" },
        { n: "DB Hammer Curls (heavy)", s: "3Ã—8", t: "30 lb" }, { n: "DB Shrugs", s: "4Ã—12", t: "50 lb" },
      ], cardio: "Rower â€“ 12 min intervals" },
      { day: "Thursday", label: "Active Recovery", rehab: [
        { n: "Light rehab circuit", s: "1Ã—", t: "" }, { n: "Foam Rolling + Stretching", s: "20 min", t: "Full body" },
      ], workout: [
        { n: "Sled Pull (easy/mod)", s: "4Ã—40 yd", t: "Recovery blood flow" }, { n: "Spinner Bike", s: "20 min", t: "Easy" },
      ], cardio: "" },
      { day: "Friday", label: "Full Upper Hypertrophy", rehab: [
        { n: "TKEs", s: "2Ã—15", t: "" }, { n: "Slant Board Squats", s: "2Ã—15", t: "" },
      ], workout: [
        { n: "DB Arnold Press", s: "4Ã—10", t: "" }, { n: "DB Upright Rows", s: "3Ã—12", t: "" },
        { n: "DB Tricep OH Extension", s: "4Ã—10", t: "" }, { n: "DB Concentration Curls", s: "3Ã—10 ea", t: "" },
        { n: "Plank Hold", s: "3Ã—60s", t: "" }, { n: "Side Plank", s: "3Ã—30s ea", t: "" },
        { n: "Wall Ball Slams", s: "3Ã—12", t: "More leg drive" },
      ], cardio: "Ski-Erg â€“ 15 min mod-hard" },
      { day: "Saturday", label: "Leg Day (Full Loading)", rehab: [
        { n: "TKEs", s: "2Ã—15", t: "Warm-up" }, { n: "Slant Board Squats (BW)", s: "2Ã—15", t: "" },
      ], workout: [
        { n: "Sled Pull (heavy)", s: "6Ã—40 yd", t: "Max sustainable" },
        { n: "Sled Backward Drag (heavy)", s: "4Ã—30 yd", t: "Serious VMO" },
        { n: "Slant Board Goblet Squat", s: "4Ã—10", t: "30-35 lb" },
        { n: "DB Romanian Deadlifts", s: "4Ã—8", t: "45-50 lb" },
        { n: "DB Split Squats", s: "4Ã—8 ea", t: "20 lb each" },
        { n: "Glute Bridges (heavy)", s: "4Ã—10", t: "40-45 lb" },
        { n: "Weighted Calf Raises", s: "4Ã—15", t: "" },
      ], cardio: "Air Bike â€“ 10 min cooldown" },
      { day: "Sunday", label: "Rest", rehab: [], workout: [], cardio: "Complete rest." },
    ]},
  { week: 6, theme: "Peak & Assess", focus: "Minimal rehab. Test max. Reassess knee.",
    days: [
      { day: "Monday", label: "Upper Push (Peak)", rehab: [
        { n: "Slant Board Squats + TKEs", s: "2Ã—15 each", t: "Dynamic warm-up" },
      ], workout: [
        { n: "DB Bench Press", s: "5Ã—5", t: "Heaviest possible" }, { n: "DB Incline Press", s: "4Ã—6-8", t: "" },
        { n: "DB Flyes", s: "3Ã—12", t: "" }, { n: "DB Shoulder Press", s: "4Ã—6-8", t: "" },
        { n: "DB Lateral Raises", s: "4Ã—15", t: "" }, { n: "Push-Up Burnout", s: "2Ã—max", t: "" },
      ], cardio: "Air Bike â€“ 15 min HIIT" },
      { day: "Tuesday", label: "Cardio Test", rehab: [
        { n: "Dynamic warm-up", s: "5 min", t: "" }, { n: "Slant Board Squats", s: "2Ã—15", t: "" },
      ], workout: [
        { n: "Rower â€“ 2000m Time Trial", s: "1 attempt", t: "Test fitness!" },
        { n: "Spinner Bike", s: "15 min", t: "Cooldown" }, { n: "Ski-Erg", s: "10 min", t: "Steady" },
      ], cardio: "" },
      { day: "Wednesday", label: "Upper Pull (Peak)", rehab: [
        { n: "Slant Board Squats + TKEs", s: "2Ã—15 each", t: "" },
      ], workout: [
        { n: "Pull-Ups (max weighted)", s: "5Ã—max", t: "Test max" }, { n: "DB Rows", s: "5Ã—6-8 ea", t: "50 lb" },
        { n: "DB Reverse Flyes", s: "3Ã—15", t: "" }, { n: "DB Curls", s: "4Ã—8", t: "Heaviest" },
        { n: "DB Hammer Curls", s: "4Ã—8", t: "" }, { n: "DB Shrugs", s: "4Ã—15", t: "50 lb" },
      ], cardio: "Rower â€“ 12 min pyramid" },
      { day: "Thursday", label: "Recovery + Knee Check", rehab: [
        { n: "Full W1 rehab circuit", s: "1Ã—", t: "Compare to Week 1!" },
        { n: "Foam Rolling + Stretching", s: "20 min", t: "" },
        { n: "KNEE SELF-ASSESSMENT", s: "â€“", t: "Pain, ROM, swelling" },
      ], workout: [{ n: "Spinner Bike", s: "20 min", t: "Easy" }], cardio: "" },
      { day: "Friday", label: "Full Upper Circuit", rehab: [
        { n: "Slant Board Squats + TKEs", s: "2Ã—15 each", t: "" },
      ], workout: [
        { n: "CIRCUIT: 4 Rounds (45s/15s)", s: "", t: "" },
        { n: "â€“ DB Shoulder Press", s: "AMRAP", t: "" }, { n: "â€“ Pull-Ups", s: "AMRAP", t: "" },
        { n: "â€“ Push-Ups", s: "AMRAP", t: "" }, { n: "â€“ DB Curls", s: "AMRAP", t: "" },
        { n: "â€“ Wall Ball Slams", s: "AMRAP", t: "" }, { n: "â€“ Plank Hold", s: "45s", t: "" },
      ], cardio: "Ski-Erg â€“ 15 min hard" },
      { day: "Saturday", label: "Leg Day (Full Test)", rehab: [
        { n: "Dynamic warm-up + TKEs", s: "2Ã—15", t: "" },
      ], workout: [
        { n: "Sled Pull (MAX TEST)", s: "4Ã—40 yd", t: "Find max!" },
        { n: "Sled Backward Drag (MAX)", s: "3Ã—30 yd", t: "Heaviest good form" },
        { n: "Slant Board Goblet Squat", s: "4Ã—10", t: "35-40 lb" },
        { n: "DB Romanian Deadlifts", s: "4Ã—8", t: "50 lb" },
        { n: "DB Split Squats", s: "4Ã—8 ea", t: "25 lb each" },
        { n: "DB Walking Lunges", s: "3Ã—10 ea", t: "25 lb each" },
        { n: "Glute Bridges (heavy)", s: "4Ã—10", t: "45-50 lb" },
        { n: "Weighted Calf Raises", s: "4Ã—15", t: "Max weight" },
      ], cardio: "Air Bike â€“ 10 min cooldown" },
      { day: "Sunday", label: "Rest + Assessment", rehab: [], workout: [], cardio: "Complete rest. Self-assessment." },
    ]},
];

export default function App() {
  const [sw, setSw] = useState(0);
  const [sd, setSd] = useState(0);
  const [ck, setCk] = useState({});
  const [vw, setVw] = useState("w"); // w=workout, p=picker
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async()=>{try{const r=await window.storage.get("kr3");if(r?.value)setCk(JSON.parse(r.value));}catch(e){}})();
    setSd([6,0,1,2,3,4,5][new Date().getDay()]??0);
  }, []);

  const sv=useCallback(async(c)=>{try{await window.storage.set("kr3",JSON.stringify(c));}catch(e){}},[]);
  const tg=(k)=>{const n={...ck,[k]:!ck[k]};setCk(n);sv(n);};
  const fl=(m)=>{setToast(m);setTimeout(()=>setToast(null),1500);};

  const wk=WEEKS[sw], dy=wk.days[sd];
  const all=[...dy.rehab,...dy.workout], tot=all.length;
  const dn=all.filter((_,i)=>ck[`${sw}-${sd}-${i}`]).length;
  const pct=tot>0?Math.round((dn/tot)*100):0;
  const rest=dy.rehab.length===0&&dy.workout.length===0;

  const wComp=(wi)=>{let d=0,t=0;WEEKS[wi].days.forEach((dy,di)=>{const e=[...dy.rehab,...dy.workout];if(!e.length)return;t++;if(e.every((_,ei)=>ck[`${wi}-${di}-${ei}`]))d++;});return{d,t};};

  const openVid=(name)=>{
    const q=V[name];
    if(!q)return;
    const url=`https://www.youtube.com/results?search_query=${q}`;
    // Try multiple methods to open YouTube
    const w = window.open(url, '_blank');
    if (!w) {
      // Fallback: create a temporary link and click it
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const ExRow=({ex,idx,grn})=>{
    const k=`${sw}-${sd}-${idx}`;
    const done=!!ck[k];
    const ac=grn?"#66bb6a":"#42a5f5";
    const bg=done?(grn?"rgba(102,187,106,0.08)":"rgba(66,165,245,0.08)"):"rgba(255,255,255,0.03)";
    const bd=done?(grn?"rgba(102,187,106,0.2)":"rgba(66,165,245,0.2)"):"rgba(255,255,255,0.06)";
    const hasVid=V[ex.n]!=null;
    return(
      <div style={{display:"flex",alignItems:"flex-start",gap:12,padding:"12px 14px",marginBottom:6,background:bg,borderRadius:14,border:`1px solid ${bd}`,transition:"all 0.2s"}}>
        <button onClick={()=>{tg(k);if(!done)fl("âœ“ Done!");}} style={{width:28,height:28,minWidth:28,borderRadius:8,border:done?"none":"2px solid rgba(255,255,255,0.2)",background:done?ac:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginTop:2,color:"#fff",fontSize:14,fontWeight:800}}>{done&&"âœ“"}</button>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
            <div style={{fontSize:15,fontWeight:600,textDecoration:done?"line-through":"none",opacity:done?0.5:1,lineHeight:1.3}}>{ex.n}</div>
            <div style={{fontSize:13,fontWeight:700,color:ac,whiteSpace:"nowrap",flexShrink:0}}>{ex.s}</div>
          </div>
          {ex.t&&<div style={{fontSize:12,color:"#8899aa",marginTop:3}}>{ex.t}</div>}
          {hasVid&&<button onClick={()=>openVid(ex.n)} style={{display:"inline-flex",alignItems:"center",gap:4,marginTop:6,fontSize:11,color:"#ef5350",fontWeight:700,background:"rgba(239,83,80,0.1)",padding:"3px 10px",borderRadius:8,border:"none",cursor:"pointer"}}>â–¶ Watch Form</button>}
        </div>
      </div>
    );
  };

  // WEEK PICKER
  if(vw==="p"){
    return(
      <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a1628,#1a2744,#0d1f3c)",color:"#fff",fontFamily:"'SF Pro Display',-apple-system,sans-serif"}}>
        <div style={{padding:"20px 16px",maxWidth:480,margin:"0 auto"}}>
          <button onClick={()=>setVw("w")} style={{background:"none",border:"none",color:"#64b5f6",fontSize:16,cursor:"pointer",padding:"8px 0",marginBottom:16}}>â† Back</button>
          <h1 style={{fontSize:28,fontWeight:800,margin:"0 0 8px"}}>Select Week</h1>
          <p style={{color:"#8899aa",margin:"0 0 24px",fontSize:14}}>6-Week Knee Rehab Program</p>
          {WEEKS.map((w,i)=>{const c=wComp(i);const p=c.t>0?Math.round((c.d/c.t)*100):0;return(
            <button key={i} onClick={()=>{setSw(i);setSd(0);setVw("w");}} style={{display:"block",width:"100%",padding:"16px 20px",marginBottom:12,background:sw===i?"rgba(100,181,246,0.15)":"rgba(255,255,255,0.04)",border:sw===i?"1px solid rgba(100,181,246,0.4)":"1px solid rgba(255,255,255,0.08)",borderRadius:16,cursor:"pointer",textAlign:"left",color:"#fff"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:11,fontWeight:700,color:"#64b5f6",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Week {w.week}</div><div style={{fontSize:17,fontWeight:700}}>{w.theme}</div><div style={{fontSize:12,color:"#8899aa",marginTop:4}}>{w.focus}</div></div>
                <div style={{textAlign:"center",minWidth:52}}><div style={{fontSize:22,fontWeight:800,color:p===100?"#66bb6a":"#64b5f6"}}>{p}%</div><div style={{fontSize:10,color:"#8899aa"}}>{c.d}/{c.t} days</div></div>
              </div>
              <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2,marginTop:12}}><div style={{height:3,background:p===100?"#66bb6a":"#64b5f6",borderRadius:2,width:`${p}%`,transition:"width 0.3s"}}/></div>
            </button>
          );})}
        </div>
      </div>
    );
  }

  // MAIN WORKOUT VIEW
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0a1628,#1a2744,#0d1f3c)",color:"#fff",fontFamily:"'SF Pro Display',-apple-system,sans-serif",paddingBottom:100}}>
      {toast&&<div style={{position:"fixed",top:20,left:"50%",transform:"translateX(-50%)",background:"#66bb6a",color:"#000",padding:"10px 24px",borderRadius:30,fontSize:14,fontWeight:700,zIndex:999,boxShadow:"0 4px 20px rgba(102,187,106,0.4)"}}>{toast}</div>}
      <div style={{padding:"16px 16px 0",maxWidth:480,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <button onClick={()=>setVw("p")} style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:12,padding:"8px 14px",color:"#64b5f6",fontSize:13,fontWeight:700,cursor:"pointer"}}>WK {wk.week} â–¾</button>
          <div style={{textAlign:"right"}}><div style={{fontSize:11,color:"#8899aa",letterSpacing:1}}>LEFT KNEE REHAB</div><div style={{fontSize:12,color:"#64b5f6",fontWeight:600}}>{wk.theme}</div></div>
        </div>
        <div style={{display:"flex",gap:4,marginBottom:16,overflowX:"auto",paddingBottom:4}}>
          {wk.days.map((d,i)=>{const sel=i===sd;const exs=[...d.rehab,...d.workout];const dd=exs.length>0&&exs.every((_,ei)=>ck[`${sw}-${i}-${ei}`]);return(
            <button key={i} onClick={()=>setSd(i)} style={{flex:"1 0 auto",minWidth:44,padding:"8px 4px",border:sel?"2px solid #64b5f6":"1px solid rgba(255,255,255,0.08)",borderRadius:14,background:sel?"rgba(100,181,246,0.15)":dd?"rgba(102,187,106,0.1)":"rgba(255,255,255,0.03)",cursor:"pointer",color:"#fff",textAlign:"center"}}>
              <div style={{fontSize:10,fontWeight:700,color:sel?"#64b5f6":"#8899aa"}}>{d.day.charAt(0)}</div>
              <div style={{fontSize:13,fontWeight:700,marginTop:2}}>{d.day.slice(0,3)}</div>
              {dd&&exs.length>0&&<div style={{fontSize:10,marginTop:2}}>âœ“</div>}
            </button>
          );})}
        </div>
      </div>
      <div style={{padding:"0 16px",maxWidth:480,margin:"0 auto"}}>
        <div style={{marginBottom:16}}><h2 style={{fontSize:24,fontWeight:800,margin:"0 0 4px"}}>{dy.day}</h2><div style={{fontSize:14,color:"#8899aa"}}>{dy.label}</div></div>
        {rest?(
          <div style={{background:"rgba(255,255,255,0.04)",borderRadius:20,padding:"40px 24px",textAlign:"center",border:"1px solid rgba(255,255,255,0.06)"}}>
            <div style={{fontSize:48,marginBottom:16}}>ðŸ˜´</div><div style={{fontSize:20,fontWeight:700,marginBottom:8}}>Rest Day</div><div style={{fontSize:14,color:"#8899aa"}}>{dy.cardio}</div>
          </div>
        ):(
          <>
            <div style={{marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,color:"#8899aa"}}>{dn}/{tot} exercises</span><span style={{fontSize:12,fontWeight:700,color:pct===100?"#66bb6a":"#64b5f6"}}>{pct}%</span></div>
              <div style={{height:6,background:"rgba(255,255,255,0.06)",borderRadius:3}}><div style={{height:6,background:pct===100?"linear-gradient(90deg,#66bb6a,#81c784)":"linear-gradient(90deg,#42a5f5,#64b5f6)",borderRadius:3,width:`${pct}%`,transition:"width 0.4s"}}/></div>
            </div>
            {dy.rehab.length>0&&(
              <div style={{marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:4,height:20,background:"#66bb6a",borderRadius:2}}/><span style={{fontSize:13,fontWeight:800,color:"#66bb6a",letterSpacing:1.5,textTransform:"uppercase"}}>Knee Rehab</span></div>
                {dy.rehab.map((ex,i)=><ExRow key={i} ex={ex} idx={i} grn={true}/>)}
              </div>
            )}
            {dy.workout.length>0&&(
              <div style={{marginBottom:20}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><div style={{width:4,height:20,background:"#42a5f5",borderRadius:2}}/><span style={{fontSize:13,fontWeight:800,color:"#42a5f5",letterSpacing:1.5,textTransform:"uppercase"}}>Workout</span></div>
                {dy.workout.map((ex,i)=><ExRow key={i} ex={ex} idx={dy.rehab.length+i} grn={false}/>)}
              </div>
            )}
            {dy.cardio&&(
              <div style={{background:"rgba(255,152,0,0.08)",border:"1px solid rgba(255,152,0,0.2)",borderRadius:14,padding:"14px 16px",marginBottom:16}}>
                <div style={{fontSize:11,fontWeight:800,color:"#ffa726",letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>ðŸ”¥ Cardio Finisher</div>
                <div style={{fontSize:14,fontWeight:600}}>{dy.cardio}</div>
              </div>
            )}
          </>
        )}
        <div style={{background:"rgba(239,83,80,0.06)",border:"1px solid rgba(239,83,80,0.15)",borderRadius:14,padding:"12px 16px",marginTop:12}}>
          <div style={{fontSize:12,color:"#ef5350",fontWeight:600}}>âš ï¸ Pain 1-3/10 = OK Â· Sharp pain = STOP Â· Ice after (Wks 1-3)</div>
        </div>
      </div>
    </div>
  );
}
