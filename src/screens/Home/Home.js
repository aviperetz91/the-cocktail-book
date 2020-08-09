import React from 'react';
import { Container, Header, Left, Title, Tab, Tabs, TabHeading, Text, Right, Button, Icon } from 'native-base';
import { View, TouchableOpacity } from 'react-native';
import { Tooltip } from 'react-native-elements';
import Categories from '../Categories/Categories/';
import Filters from '../Filters/Filters';

const Home = props => {
    const tooltipRef = React.createRef();

    return (
        <Container>
            <Header hasTabs style={{ marginBottom: 15 }}>
                <Left>
                    <View>
                        <Button transparent onPress={() => tooltipRef.current.toggleTooltip()}>
                            <Icon type={'Ionicons'} name={"ellipsis-vertical"} color={'white'} style={{ fontSize: 20 }} />
                        </Button>
                        <Tooltip
                            ref={tooltipRef}
                            backgroundColor={'white'}
                            containerStyle={{ borderRadius: 3, elevation: 5, position: 'absolute', top: 0, left: 0 }}
                            height={75}
                            width={120}
                            withOverlay={false}
                            popover={
                                <View>
                                    <TouchableOpacity
                                        style={{ marginVertical: 5 }}
                                        onPress={() => tooltipRef.current.toggleTooltip()}
                                    >
                                        <Text>My Account</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ marginVertical: 5 }}
                                        onPress={() => tooltipRef.current.toggleTooltip()}
                                    >
                                        <Text>Settings</Text>
                                    </TouchableOpacity>
                                </View>
                            }>
                        </Tooltip>
                    </View>
                </Left>
                <Right>
                    <Title style={{ marginRight: 10 }}>
                        The Cocktail Book
                    </Title>
                </Right>
            </Header>
            <Tabs>
                <Tab heading={
                    <TabHeading>
                        <Icon type={'FontAwesome'} name={'th-large'} color={"white"} style={{ fontSize: 18 }} />
                        <Text> Categories</Text>
                    </TabHeading>
                }>
                    <Categories navigation={props.navigation}/>
                </Tab>
                <Tab heading={
                    <TabHeading>
                        <Icon type={'FontAwesome'} name={'filter'} color={"white"} style={{ fontSize: 18 }} />
                        <Text> Filters</Text>
                    </TabHeading>
                }>
                     <Filters navigation={props.navigation}/>
                </Tab>
                <Tab heading={
                    <TabHeading>
                        <Icon type={'FontAwesome'} name={'star'} color={"white"} style={{ fontSize: 18 }} />
                        <Text> Favorites</Text>
                    </TabHeading>
                }>                   
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Home;