import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { Avatar, Title, Drawer } from 'react-native-paper';
import { signout } from '../../store/actions/AuthActions';
import avatar from '../../assets/images/avatar.jpg'
import styles from './style';

const DrawerContent = (props) => {

  const { userName, userPhoto } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={userPhoto ? { uri: userPhoto } : avatar}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{userName}</Title>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type={'MaterialCommunityIcons'}
                  name="home-outline"
                  style={{ fontSize: size, color: color }}
                />
              )}
              label="Home"
              onPress={() => props.navigation.navigate('Home')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type={'MaterialCommunityIcons'}
                  name="account-outline"
                  style={{ fontSize: size, color: color }}
                />
              )}
              label="Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type={'Ionicons'}
                  name='grid-outline'
                  style={{ fontSize: size - 3, color: color, marginLeft: 1 }}
                />
              )}
              label="Categories"
              onPress={() => props.navigation.navigate('Categories')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type={'MaterialCommunityIcons'}
                  name="filter-variant"
                  style={{ fontSize: size, color: color }}
                />
              )}
              label="Filters"
              onPress={() => props.navigation.navigate('Filters')}
            />
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type={'MaterialCommunityIcons'}
                  name="magnify"
                  style={{ fontSize: size, color: color }}
                />
              )}
              label="Search"
              onPress={() => props.navigation.navigate('Search')}
            />    
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  type={'MaterialCommunityIcons'}
                  name="heart-outline"
                  style={{ fontSize: size - 1, color: color }}
                />
              )}
              label="Favorites"
              onPress={() => props.navigation.navigate('Favorites')}
            />                        
          </Drawer.Section>

        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon
              type={'MaterialCommunityIcons'}
              name="exit-to-app"
              style={{ fontSize: size, color: color }}
            />
          )}
          label="Sign Out"
          onPress={() =>  dispatch(signout()) }
        />
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;