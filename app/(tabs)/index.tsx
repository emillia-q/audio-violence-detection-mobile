import {useRef, useState} from "react";
import PagerView from "react-native-pager-view";
import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, View} from "react-native";
import {Colors} from "@/src/constants/theme";
import ModeSwitcher from "@/src/components/ModeSwitcher";
import UserDashboard from "@/src/components/dashboard/UserDashboard";
import TrustedUserDashboard from "@/src/components/dashboard/TrustedUserDashboard";

export default function DashboardScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Mode switcher
  const handleSwitch = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentPage(index);
  }

  return (
      <SafeAreaView style={styles.safeArea}>
        <ModeSwitcher selectedIndex={currentPage} onSelect={handleSwitch}/>

        {/* Swipe mode change */}
        <PagerView
          style={styles.pageView}
          initialPage={0}
          ref={pagerRef}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
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