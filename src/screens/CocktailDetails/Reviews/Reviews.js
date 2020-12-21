import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Text, Button, Textarea, List, ListItem, Left, Right, Body, Thumbnail, Icon } from 'native-base';
import { Dialog, Portal, Button as Btn } from 'react-native-paper';
import { AirbnbRating, Rating } from 'react-native-elements';
import styles from './style';
import Colors from '../../../constants/Colors';
import { leaveFeedback } from '../../../store/actions/ReviewsActions';

const Reviews = props => {

    const { idDrink } = props;

    const [showModal, setShowModal] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(3);

    const token = useSelector(state => state.auth.token)
    const userId = useSelector(state => state.auth.userId)
    const reviews = useSelector(state => state.reviews.reviews)
    const dispatch = useDispatch();

    const leaveFeedbackHandler = () => {
        dispatch(leaveFeedback(idDrink, token, userId, rating, comment))
        setShowModal(false);
    }

    const cancelHandler = () => {
        setShowModal(false);
        setComment('');
        setRating(3);
    }

    const renderReview = (review) => (
        <ListItem style={styles.listItem} thumbnail>
            <Left style={styles.avatarContainer}>
                <Thumbnail source={{ uri: 'https://www.computerhope.com/jargon/g/guest-user.jpg' }} />
            </Left>
            <Body>
                <Text style={styles.reviewAutor}>username</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
            </Body>
            <View style={styles.reviewRatingContainer}>
                <Rating
                    readonly
                    startingValue={review.rating}
                    showRating={false}
                    imageSize={15}
                />
            </View>
        </ListItem>

    )

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowModal(true)}>
                <Icon type={'Ionicons'} name="add" style={{ fontSize: 35, color: 'white' }} />
            </TouchableOpacity>
            <List>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={reviews}
                    renderItem={({item}) => renderReview(item)}
                />
            </List>
            <Portal>
                <Dialog visible={showModal} onDismiss={cancelHandler} >
                    <Dialog.Content>
                        <View>
                            <AirbnbRating
                                showRating
                                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great']}
                                count={5}
                                size={45}
                                onFinishRating={(value) => setRating(value)}
                            />
                        </View>
                        <View style={styles.textareaContainer}>
                            <Textarea
                                rowSpan={4}
                                bordered
                                placeholder="Leave your feedback here...."
                                onChangeText={input => setComment(input)}
                            />
                        </View>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Btn color={Colors.success} onPress={leaveFeedbackHandler}>Done</Btn>
                        <Btn color={Colors.danger} onPress={cancelHandler}>Cancel</Btn>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

export default Reviews;