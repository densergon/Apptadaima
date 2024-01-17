import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  h1: {
    fontSize: 20,
  },
  homework: {
    backgroundColor: "#bdc3c7",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "90%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  homeworkTitle: {
    fontSize: 14,
  },
  badgeDanger: {
    backgroundColor: "#e74c3c",
    padding: 5,
    width: 120,
    borderRadius: 10,
  },
  badgeWarning: {
    backgroundColor: "#f1c40f",
    padding: 5,
    width: 120,
    borderRadius: 10,
  },
  badgeNormal: {
    backgroundColor: "#3498db",
    padding: 5,
    width: 120,
    borderRadius: 10,
  },
  badgeTxt: {
    fontWeight: "500",
    textAlign: "center",
  },
  badgeTxtLight: {
    fontWeight: "500",
    color: "white",
    textAlign: "center",
  },
  priorityUrgent: {
    color: 'red',
  },

  // Estilos para prioridad "No tan urgente"
  priorityNotUrgent: {
    color: 'yellow',
  },

  // Estilos para prioridad "Regular"
  priorityRegular: {
    color: 'gray',
  },
});
