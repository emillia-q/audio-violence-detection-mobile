import {StyleSheet} from "react-native";
import {Colors} from "@/src/constants/theme";

interface EmptyListViewProps {
    title: string;
}

export default function EmptyListView({title}: EmptyListViewProps) {

}

const styles = StyleSheet.create({
    emptyContainer: {
        alignItems: 'center',
        padding: 24,
        backgroundColor: Colors.user.surface,
        borderColor: Colors.user.border,
        borderWidth: 1,
        borderRadius: 16,
        borderStyle: 'dashed',
    },
    emptyTitle: {
        color: Colors.user.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContainer: {
        width: '100%',
    },
});