import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from "react-native";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const uid = user.uid;
        setUid(uid);
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            username: data.username || user.displayName || "N/A",
            email: user.email || "N/A",
            joinedAt: data.joinedAt || new Date().toISOString(),
          });
        } else {
          
          setUserData({
            username: user.displayName || "N/A",
            email: user.email || "N/A",
            joinedAt: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData || !uid) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
        <Text style={styles.loadingText}>Fetching your profile...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/rest.png")}
      style={styles.background}
    >
      <View style={styles.card}>
        <Text style={styles.title}>👤 Profile Overview</Text>
        <View style={styles.divider} />

        <Text style={styles.label}>Username:</Text>
        <Text style={styles.value}>{userData.username}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>

        <Text style={styles.label}>UID:</Text>
        <Text style={styles.value}>{uid}</Text>

        <Text style={styles.label}>Joined On:</Text>
        <Text style={styles.value}>
          {new Date(userData.joinedAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  card: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#d4af37",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4B4453",
    marginBottom: 10,
    alignSelf: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6D597A",
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: "#4B4453",
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
});
