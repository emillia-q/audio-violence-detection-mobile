import {z} from "zod";

const formSchema = z.object({
    nickname: z.string()
        .max(100, "Nickname cannot be longer than 100 characters")
        .regex(/^(?=.*\S)[a-zA-Z0-9ąęćłńóśźżĄĘĆŁŃÓŚŹŻ ]*$/, "Only letters, numbers and spaces allowed")
        .optional()
        .or(z.literal(''))
});

type FormValues = z.infer<typeof formSchema>;

interface ManageTrustedUserSheetProps {
    isVisible: boolean;
    trustedUserId: number | null;
    onClose: () => void;
    onSuccess: () => void;
}

