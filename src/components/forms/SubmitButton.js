import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFormikContext } from 'formik';
import { colors, fontSize, padding } from '../../constants/styles';

const SubmitButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity
      onPress={handleSubmit}
      title={title}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 5,
  },
  title: {
    fontSize: fontSize._20,
    color: colors.white,
    paddingHorizontal: padding.md,
    paddingVertical: padding.sm,
  },
});

export default SubmitButton;
