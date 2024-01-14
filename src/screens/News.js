/*
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const FacebookPage = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://www.facebook.com/escomipnmx' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default FacebookPage;
*/

import React from "react";
import { FacebookProvider, Page } from "react-facebook";

const facebookAppId = "720324572856305"; // Reemplaza con tu App ID de Facebook
const pageUrl = "https://www.facebook.com/escomipnmx"; // Reemplaza con la URL de la página de Facebook

function FacebookPage() {
  return (
    <div style={{ justifyContent: "center", width: "100" }}>
      <FacebookProvider appId={facebookAppId}>
      <Page href={pageUrl} tabs="timeline" width={39000} height={700}  style={{ border: '2px solid #ddd', padding: '10px'}}/>
      </FacebookProvider>
    </div>
  );
}

export default FacebookPage;
