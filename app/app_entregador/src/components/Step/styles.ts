import { StyleSheet} from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 16
    },

    contentText: {
        alignItems: 'center',
    },

    line: {
        height: 5,
        backgroundColor: theme.colors.gray
    },

    icon: {
        color: theme.colors.primary
    },

    text: {
        fontFamily: theme.fonts.text500,
        color: theme.colors.subTitle,
        fontSize: 13
    }
});