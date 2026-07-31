import {useRef, useState} from "react";
import PagerView from "react-native-pager-view";

export default function DashboardScreen() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // Mode switcher
  const handleSwitch = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentPage(index);
  }
}