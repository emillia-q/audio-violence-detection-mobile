import {
    StyleSheet, Text,
    View
} from "react-native";
import {Colors} from "@/src/constants/theme";
import {CustomInput} from "@/src/components/ui/CustomInput";
import AboveInputLabel from "@/src/components/ui/AboveInputLabel";
import {CustomButton} from "@/src/components/ui/CustomButton";
import {z} from "zod";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import BottomSheet from "@/src/components/ui/BottomSheet";
import BottomSheetHeader from "@/src/components/ui/BottomSheetHeader";

const formSchema = z.object({
    email: z.string().min(1, "E-mail is required").email("Invalid email format"),
    nickname: z.string()
        .max(100, "Nickname cannot be longer than 100 characters")
        .regex(/^(?=.*\S)[a-zA-Z0-9ąęćłńóśźżĄĘĆŁŃÓŚŹŻ ]*$/, "Only letters, numbers, and spaces allowed")
        .optional()
        .or(z.literal('')) // Allows empty field
});

type FormValues = z.infer<typeof formSchema>;

interface AddTrustedUserSheetProps {
    isVisible: boolean;
    onClose: () => void;
    onSubmit: (email: string, nickname: string) => Promise<{ success: boolean; status?: number }>;
}

export default function AddTrustedUserSheet({isVisible, onClose, onSubmit}: AddTrustedUserSheetProps) {

    const {control, handleSubmit, reset, setError} = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        mode: "onTouched",
        defaultValues: {email: "", nickname: ""}
    });

    const onValidSubmit = async (data: FormValues) => {
        const result = await onSubmit(data.email.trim(), data.nickname?.trim() || "");

        if (result.success) {
            // Clean the form
            reset();
        } else {
            if (result.status === 404) {
                setError('email', {
                    type: 'server',
                    message: 'No account found with this email'
                });
            } else if (result.status === 409) {
                setError('email', {
                    type: 'server',
                    message: 'This user is already assigned'
                });
            }
        }

    };

    const handleClose = () => {
        reset();
        onClose();
    }

    return (
        <BottomSheet
            isVisible={isVisible}
            onClose={handleClose}>
            <View style={styles.content}>

                <BottomSheetHeader
                    title="Add Trusted User"
                    iconName="person-add-outline"
                    description="Enter the email address of the user you want to grant trusted access to."
                />

                {/* Inputs */}
                {/* Email */}
                <AboveInputLabel title={"E-mail"}/>
                <Controller
                    control={control}
                    name={"email"}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <CustomInput
                            placeholder={"e.g. anna@example.com"}
                            placeholderTextColor={Colors.user.placeholder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType={"email-address"}
                            autoCapitalize={"none"}
                            errorMessage={error?.message}
                        />
                    )}
                />

                {/* Nickname */}
                <AboveInputLabel title={"Nickname (optional)"}/>
                <Controller
                    control={control}
                    name={"nickname"}
                    render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
                        <CustomInput
                            placeholder={"e.g. Ania"}
                            placeholderTextColor={Colors.user.placeholder}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            errorMessage={error?.message}
                        />
                    )}
                />

                {/* Add button */}
                <CustomButton
                    style={styles.addButton}
                    title={"Save"}
                    onPress={handleSubmit(onValidSubmit)}
                />
            </View>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 24,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 20,
        color: Colors.user.text,
    },
    addButton: {
        alignSelf: 'flex-end',
    }
});