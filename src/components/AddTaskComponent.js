import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Yup from 'yup';

import Form from './forms/Form';
import SubmitButton from './forms/SubmitButton';
import TextInput from './forms/TextInput';
import { padding } from '../constants/styles';
import * as tasksActions from '../store/actions/tasks';
import useTasksContext from '../hooks/useTasksContext';

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(3).max(20).label('Title'),
});

const AddTaskComponent = () => {
  const [, dispatch] = useTasksContext();

  const handleSubmit = ({ title }, { resetForm }) => {
    dispatch(tasksActions.addTask(title));
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Form
        initialValues={{ title: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <TextInput name="title" placeholder={'Enter a task title'} />
        <SubmitButton title="Add task" />
      </Form>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingRight: padding.sm,
    marginVertical: padding.sm,
  },
});

export default AddTaskComponent;
