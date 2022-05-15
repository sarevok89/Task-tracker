import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import { useFormikContext } from 'formik';
import { colors } from '../../constants/styles';

const TextInput = ({ name, placeholder }) => {
  const { values, handleChange, errors } = useFormikContext();

  return (
    <Input
      placeholder={placeholder}
      errorStyle={styles.errorStyle}
      errorMessage={errors[name]}
      onChangeText={handleChange(name)}
      containerStyle={styles.containerStyle}
      value={values[name]}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flexShrink: 1,
  },
  errorStyle: {
    color: colors.danger,
  },
});

export default TextInput;
