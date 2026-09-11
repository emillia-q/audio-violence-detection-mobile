import {useTheme} from "@/src/context/ModeContext";
import {StyleSheet, Text, View} from "react-native";
import {CustomButton} from "@/src/components/ui/CustomButton";

interface PaginationFooterProps {
    page: number;
    hasMorePages: boolean;
    onPrev: () => void;
    onNext: () => void;
}

export default function PaginationFooter({ page, hasMorePages, onPrev, onNext }: PaginationFooterProps) {
    const theme = useTheme();

    return (
        <View style={styles.paginationContainer}>
            <CustomButton
                title={"Prev"}
                variant={"text"}
                disabled={page === 0}
                onPress={onPrev}
            />
            <Text style={[
                styles.pageText,
                {
                    color: theme.tint,
                }
            ]}>
                {page + 1}
            </Text>
            <CustomButton
                title={"Next"}
                variant={"text"}
                disabled={!hasMorePages}
                onPress={onNext}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        paddingBottom: 64,
    },
    pageText: {
        fontSize: 16,
        fontWeight: '600',
    },
});