import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Button,
    Modal,
    TextInput,
    FlatList,
} from 'react-native';

import firebase from 'firebase';

import _ from 'lodash';

import { ListItem } from 'react-native-elements';

const MyPage = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newTask, setNewTask] = useState(' ');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        let tasksRef = firebase.database().ref('/tasks/');

        tasksRef.on('value', snapshot => {
            let val = snapshot.val();

            let valToArray = _.map(val, element => {
                return { ...element };
            });
            setTasks(valToArray);
        });
    };

    const insertTask = () => {
        setModalVisible(false);

        let tasksRef = firebase.database().ref('/tasks/');
        let createdTask = tasksRef.push();

        let task = { id: createdTask.key, task: newTask, done: false };

        createdTask
            .set(task)
            .then(res => {
                setNewTask('');
            })
            .catch(err => console.log(err));
    };

    const updateTask = item => {
        let taskRef = firebase.database().ref('/tasks/' + item.id);

        taskRef
            .update({ done: !item.done })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const deleteTask = item => {
        let taskRef = firebase.database().ref('/tasks/' + item.id);

        taskRef
            .remove()
            .then()
            .catch();
    };

    const renderItem = ({ item }) => {
        return (
            <ListItem
                title={item.task}
                bottomDivider={true}
                onPress={() => updateTask(item)}
                onLongPress={() => deleteTask(item)}
                checkmark={item.done}
               
            />
        ); 
    };

    const keyExtractor = (item, index) => index.toString();

    return (
        <SafeAreaView style={styles.conatainer}>
            <Modal visible={modalVisible}>
                <View style={styles.modal}>
                    <TextInput
                        style={styles.textInput}
                        value={newTask}
                        onChangeText={text => setNewTask(text)}
                    />
                    <View style={{ flexDirection: 'row' }}>
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                        <Button title="Confirm" onPress={() => insertTask()} />
                    </View>
                </View>
            </Modal>
            <View style={styles.listSection}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={tasks}
                    renderItem={renderItem}
                />
            </View>
            <View style={styles.buttonSection}>
                <Button title="Add task" onPress={() => setModalVisible(true)} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    conatainer: {
        flex: 1,
        backgroundColor: '#F0F0F0',
    },
    text: {
        fontSize: 24,
        fontWeight: '600',
        color: '#000',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listSection: {
        flex: 1,
        //justifyContent: 'center',
        // alignItems: 'center',
    },
    buttonSection: {
        height: 150,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        width: 300,
        borderWidth: 1,
        borderRadius: 20,
        height: 50,
        padding: 10,
    },
});

export default MyPage;