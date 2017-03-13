/**
 * @flow
 */

import React from 'react'
import {
    Button, StyleSheet, Text, View
} from 'react-native'
import Camera from 'react-native-camera'
import RNFetchBlob from 'react-native-fetch-blob'
import base64 from 'base-64'

export default class CaptureScreen extends React.Component {
  static navigationOptions = {
    title: 'Capture',
  }

  constructor(props) {
    super(props)

    this.camera = null

    this.state = {
      recording: false,
      uploading: false
    }
  }

  toggleRecording() {
    if(this.camera) {
      if(!this.state.recording) {
        this.camera.capture()
        .then(
          (result) => {
            console.log('-> Uploading: ', result)
            this.setState({uploading: true})

            if(result && 'path' in result) {
              const path = result.path
              const equalsIdx = path.lastIndexOf('=')
              const fileExt = (
                equalsIdx > -1 ? path.substr(equalsIdx + 1).toLowerCase() : 'dat'
              )
              const fileName = '' + (new Date().getTime())

              RNFetchBlob.fetch('POST', 'https://inkhero.merchant.gg/upload/', {
                'Authorization': 'Basic ' + base64.encode('dev:devupload'),
                'Content-Type': 'multipart/form-data'
              }, [
                {
                  name: fileName,
                  filename: (fileName + '.' + fileExt),
                  data: RNFetchBlob.wrap(path)
                }
              ])
              .then((res) => {
                this.setState({uploading: false})
                console.log('-> Uploaded!')
                console.log(res.text())
              })
              .catch((err) => {
                this.setState({uploading: false})
                console.log('-> Error uploading: ', err)
              })
            }
          }
        )
        .catch(err => console.error(err))

        this.setState({
          recording: true
        })
      } else {
        this.camera.stopCapture()
        this.setState({
          recording: false
        })
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.preview}
          captureAudio
          captureMode={Camera.constants.CaptureMode.video}
          captureTarget={Camera.constants.CaptureTarget.temp}
          captureQuality={Camera.constants.CaptureQuality.high}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.toggleRecording.bind(this)}>{
            '[' + (this.state.recording ? 'STOP' : 'START') + ']' +
            ' ' + (this.state.uploading ? '(*)' : '(_)')
          }</Text>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
})
