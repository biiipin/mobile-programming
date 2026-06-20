import { LinearGradient } from "expo-linear-gradient";

import {
  Activity,
  CheckCircle,
  Dumbbell,
  Pause,
  Play,
  RotateCcw,
  StopCircle,
  Trophy,
  Zap,
} from "lucide-react-native";

import React, { useEffect, useRef, useState } from "react";

import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import OpenCVVideo from "../../components/OpenCVVideo";

import { Colors } from "../../constants/colors";

interface Exercise {
  id: string;

  name: string;

  description: string;

  color: string;

  icon: any;
}

const EXERCISES: Exercise[] = [
  {
    id: "pushup",
    name: "Push-Up",
    description: "Upper body strength",
    color: Colors.exercise.pushup,
    icon: Dumbbell,
  },

  {
    id: "squat",
    name: "Squat",
    description: "Lower body strength",
    color: Colors.exercise.squat,
    icon: Activity,
  },

  {
    id: "jumpingjack",
    name: "Jumping Jack",
    description: "Full body cardio",
    color: Colors.exercise.jumpingJack,
    icon: Zap,
  },
];

type Phase = "select" | "active" | "paused" | "summary";

export default function WorkoutScreen() {
  const [phase, setPhase] = useState<Phase>("select"); // exercise select

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  ); // store which exercise user picked

  const [repCount, setRepCount] = useState(0);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const timer = useRef<any>(null);

  const anim = useRef(new Animated.Value(1)).current;

  function startWorkout(exercise: Exercise) {
    setSelectedExercise(exercise);

    setRepCount(0);

    setElapsedSeconds(0);

    setPhase("active");
  }

  useEffect(() => {
    if (phase === "active") {
      timer.current = setInterval(() => {
        setElapsedSeconds((x) => x + 1);
      }, 1000);
    }

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [phase]);

  function updateFromOpenCV(reps: number) {
    setRepCount(reps);

    Animated.sequence([
      Animated.spring(anim, {
        toValue: 1.2,

        useNativeDriver: true,
      }),

      Animated.spring(anim, {
        toValue: 1,

        useNativeDriver: true,
      }),
    ]).start();
  }

  function resetWorkout() {
    setRepCount(0);

    setElapsedSeconds(0);

    setSelectedExercise(null);

    setPhase("select");
  }

  function time() {
    let m = Math.floor(elapsedSeconds / 60);

    let s = elapsedSeconds % 60;

    return `${m.toString().padStart(2, "0")}
:
${s.toString().padStart(2, "0")}`;
  }

  if (phase === "select") {  //choose exercise
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[Colors.surface, Colors.background]}
          style={styles.header}
        >
          <Text style={styles.title}>Choose Exercise</Text>

          <Text style={styles.subtitle}>AI workout tracking</Text>
        </LinearGradient>

        <ScrollView>
          <View style={styles.grid}>
            {EXERCISES.map((e) => (
              <TouchableOpacity
                key={e.id}
                style={styles.card}
                onPress={() => startWorkout(e)}
              >
                <e.icon color={e.color} size={30} />

                <Text style={styles.name}>{e.name}</Text>

                <Text style={styles.desc}>{e.description}</Text>

                <View
                  style={[
                    styles.start,
                    {
                      backgroundColor: e.color,
                    },
                  ]}
                >
                  <Play color="white" size={14} />

                  <Text style={styles.white}>Start</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  if (phase === "active" || phase === "paused") {
    return (
      <View style={styles.container}>
        <View style={styles.camera}>
          <OpenCVVideo
            exercise={selectedExercise?.id}
            onRepUpdate={updateFromOpenCV}
          />

          <View style={styles.overlay}>
            <Text style={styles.badge}>{selectedExercise?.name}</Text>

            <Text style={styles.time}>{time()}</Text>

            <Animated.Text
              style={[
                styles.rep,

                {
                  transform: [
                    {
                      scale: anim,
                    },
                  ],
                },
              ]}
            >
              {repCount}
            </Animated.Text>

            <View style={styles.controls}>
              <TouchableOpacity onPress={() => setPhase("summary")}>
                <StopCircle color="red" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.play}
                onPress={() =>
                  setPhase(phase === "active" ? "paused" : "active")
                }
              >
                {phase === "active" ? (
                  <Pause color="white" />
                ) : (
                  <Play color="white" />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={resetWorkout}>
                <RotateCcw color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Colors.primaryDark, Colors.primary]}
        style={styles.summary}
      >
        <CheckCircle size={50} color="lime" />

        <Text style={styles.complete}>Workout Complete</Text>

        <Trophy color="yellow" />

        <Text style={styles.rep}>{repCount}</Text>

        <TouchableOpacity onPress={resetWorkout} style={styles.finish}>
          <Text style={styles.white}>Finish</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  header: {
    padding: 50,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  subtitle: {
    color: Colors.textMuted,
  },

  grid: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },

  card: {
    width: "45%",
    padding: 20,
    backgroundColor: Colors.surface,
    borderRadius: 20,
  },

  name: {
    color: Colors.text,
    fontWeight: "700",
    marginTop: 10,
  },

  desc: {
    color: Colors.textMuted,
  },

  start: {
    flexDirection: "row",
    padding: 8,
    borderRadius: 20,
    marginTop: 15,
  },

  camera: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    alignItems: "center",
  },

  badge: {
    color: "white",
    fontSize: 20,
  },

  time: {
    color: "white",
    marginTop: 20,
  },

  rep: {
    fontSize: 90,
    fontWeight: "800",
    color: "white",
    marginTop: 80,
  },

  controls: {
    flexDirection: "row",
    gap: 30,
    marginTop: 100,
  },

  play: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 50,
  },

  summary: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  complete: {
    fontSize: 30,
    color: "white",
  },

  finish: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 20,
    marginTop: 20,
  },

  white: {
    color: "white",
  },
});
