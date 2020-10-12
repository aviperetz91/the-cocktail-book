import React from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'native-base';
import { Avatar, Title, Drawer } from 'react-native-paper';
import styles from './style';

const DrawerContent = (props) => {

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://www.computerhope.com/jargon/g/guest-user.jpg'
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>Avi Peretz</Title>
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
                  type={'ionicon'}
                  name='grid-outline'
                  style={{ fontSize: size - 2, color: color }}
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
          onPress={() => { signOut() }}
        />
      </Drawer.Section>
    </View>
  );
}

export default DrawerContent;