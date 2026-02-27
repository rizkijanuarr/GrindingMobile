import { StyleSheet } from 'react-native';
import { Colors, Spacing, FontSize } from '../../theme';
import { FontFamily } from '../../../core/common/Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  formContainer: {
    padding: Spacing.lg,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  formTitle: {
    fontSize: FontSize.xl,
    fontFamily: FontFamily.bold,
    marginBottom: Spacing.md,
    color: Colors.primary,
  },
  imagePicker: {
    height: 120,
    width: 120,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    alignSelf: 'center',
  },
  imagePickerText: {
    color: Colors.textSecondary,
    fontFamily: FontFamily.regular,
  },
  previewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    backgroundColor: '#F9F9F9',
  },
  error: {
    color: Colors.error,
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.md,
    marginTop: Spacing.md,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
  },
});
