import React, { Component } from 'react'
import {
  View
} from 'react-native'
import {
  Button,
  FormInput,
  List,
  ListItem
} from 'react-native-elements'

import request from 'superagent'

export default class MainScene extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      posts: []
    }
    this.fetchSubReddit = this.fetchSubReddit.bind(this)
  }

  fetchSubReddit () {
    const { searchTerm } = this.state
    request.get(`http://reddit.com/r/${searchTerm}.json`)
    .end((err, res) => {
      if (!err) {
        const { data } = res.body
        if (data) {
          this.setState({
            posts: data.children
          })
        }
      }
    })
  }

  render () {
    const { posts } = this.state
    return (
      <View>
        <FormInput
          placeholder='Enter a subreddit'
          onChangeText={(value) =>  this.setState({
            searchTerm: value
          })}
        />
        <Button
          buttonStyle={{marginTop: 10, marginBottom: 10}}
          backgroundColor='#03A9F4'
          title='Go'
          onPress={this.fetchSubReddit}
        />
        <List>
          {
            posts.map((post, i) => (
              <ListItem
                onPress={(post) => console.log(post)}
                key={i}
                title={post.data.title}
                avatar={{uri:post.data.thumbnail}}
              />
            ))
          }
        </List>
      </View>
    )
  }
}
