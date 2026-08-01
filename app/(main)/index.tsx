import {useEffect, useRef, useState} from "react";
import PagerView from "react-native-pager-view";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import ModeSwitcher from "@/src/components/dashboard/shared/ModeSwitcher";
import UserDashboard from "@/src/components/dashboard/user/UserDashboard";
import TrustedUserDashboard from "@/src/components/dashboard/trusted-user/TrustedUserDashboard";
import {useMode} from "@/src/context/ModeContext";

export default function DashboardScreen() {
  const pagerRef = useRef<PagerView>(null);
  const {mode, setMode} = useMode();

  // Mode switcher
  useEffect(() => {
    const pageIndex = mode === 'user' ? 0 : 1;
    pagerRef.current?.setPage(pageIndex);
  }, [mode]);

  // Swipe
  const handlePageSelected = (e: any) => {
    const position = e.nativeEvent.position;
    if (position === 0 && mode !== 'user')
      setMode('user');
    if (position === 1 && mode !== 'trustedUser')
      setMode('trustedUser');
  }

  return (
      <SafeAreaView style={styles.safeArea}>
        <ModeSwitcher/>

        {/* Swipe mode change */}
        <PagerView
          style={styles.pageView}
          initialPage={mode === 'user' ? 0 : 1}
          ref={pagerRef}
          onPageSelected={handlePageSelected}
        >
          <View key={"user_dashboard"}>
            <UserDashboard/>
          </View>
          <View key={"trusted_user_dashboard"}>
            <TrustedUserDashboard/>
          </View>
        </PagerView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.default.background,
  },
  pageView: {
    flex: 1,
  },
});