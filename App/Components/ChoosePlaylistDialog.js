/* @flow */

import * as React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Subheading,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogScrollArea,
  RadioButton,
  TouchableRipple,
} from 'react-native-paper';

type Props = {
  visible: boolean,
  close: Function,
};

type State = {
  checked: number,
};

export default class ChoosePlaylistDialog extends React.Component<Props, State> {
  state = {
    checked: 0,
  };

  _renderOptions = () => {
    const { checked } = this.state
    let _this = this
    if(this.props.playlists) {
      return this.props.playlists.map((option, i) => {
        return(
          <TouchableRipple key={i} onPress={() => this.setState({ checked: i })}>
            <View style={styles.row}>
              <View pointerEvents="none">
                <RadioButton value="normal" checked={checked === i} />
              </View>
              <Subheading style={styles.text}>{option.name}</Subheading>
            </View>
          </TouchableRipple>
        );
      });

    } else {
      return []
    }
  }

  render() {
    const { checked } = this.state;
    const { visible, close } = this.props;
    return (
      <Dialog onDismiss={close} visible={visible}>
        <DialogTitle>Choose an option</DialogTitle>
        <DialogScrollArea style={{ maxHeight: 170, paddingHorizontal: 0 }}>
          <ScrollView>
            <View>
              {this._renderOptions()}
            </View>
          </ScrollView>
        </DialogScrollArea>
        <DialogActions>
          <Button primary onPress={() => close("cancel")}>
            Cancel
          </Button>
          <Button primary onPress={()=> close(checked)}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    paddingLeft: 8,
  },
})
