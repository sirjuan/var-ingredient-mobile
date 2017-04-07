
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Icon, Text, Grid, Col } from 'native-base'
import styles from '../styles/styles';

const CameraButtons = (props) => {
  return (
    <Grid>
        <Col style={{padding: 8}}>
          <Button light block transparent onPress={props.take}>
            <Icon ios='ios-camera-outline' android="md-camera" />
            <Text>Take picture</Text>
          </Button>
        </Col>
        <Col style={{padding: 8}}>
          <Button light block transparent onPress={props.pick}>
            <Icon ios='ios-photos-outline' android="md-photos" />
            <Text>Pick from gallery</Text>
          </Button>
        </Col>
    </Grid>
  )
}

export default CameraButtons
