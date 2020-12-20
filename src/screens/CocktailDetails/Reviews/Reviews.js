import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Textarea } from 'native-base';
import { Dialog, Portal, Button as Btn } from 'react-native-paper';
import { AirbnbRating } from 'react-native-elements';
import styles from './style';
import Colors from '../../../constants/Colors';

const Reviews = props => {

    const [showModal, setShowModal] = useState(false);

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button success onPress={() => setShowModal(true)}>
                    <Text> Add </Text>
                </Button>
            </View>
            <Portal>
                <Dialog visible={showModal} onDismiss={() => setShowModal(false)} >
                    {/* <Dialog.Title>Add Review</Dialog.Title> */}
                    <Dialog.Content>
                        <View>
                            <AirbnbRating
                                showRating
                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                                count={5}
                                size={45}
                            />
                        </View>
                        <View style={styles.textareaContainer}>
                            <Textarea rowSpan={4} bordered placeholder="Leave your feedback here...." />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Btn color={Colors.success} onPress={() => setShowModal(false)}>Done</Btn>
                        <Btn color={Colors.danger} onPress={() => setShowModal(false)}>Cancel</Btn>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default Reviews;