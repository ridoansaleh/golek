import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AsyncStorage,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { Icon, Text, View } from 'native-base';
import { Grid, Col, Row } from 'react-native-easy-grid';
import StarRating from 'react-native-star-rating';
// import defaultImage from '../../../assets/default-product.jpg';
import emptyResult from '../../../assets/empty_search_result.png';
import { db } from '../../../firebase.config';
import { urls } from '../../constant';
import { convertToCurrency } from '../../utils';

const { width, height } = Dimensions.get('window');
const numColumns = 2;
const halfWidth = width / numColumns;

class Shop extends Component {
  static propTypes = {
    nav: PropTypes.object,
    shop: PropTypes.object,
    products: PropTypes.array,
  };

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Grid>
          <Row>
            <Image
              source={{ uri: this.props.shop.photo }}
              style={{ width: width - 20, height: 0.3 * height }}
            />
          </Row>
          <Row style={{ marginTop: 5, marginBottom: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>{this.props.shop.nama}</Text>
          </Row>
          <Row style={{ marginBottom: 15 }}>
            <Text>{this.props.shop.deskripsi}</Text>
          </Row>
          <Row style={{ borderColor: 'black', borderWidth: 1, padding: 5 }}>
            <Col size={9}>
              <Text>Daftar Produk</Text>
            </Col>
            <Col size={1}>
              <Icon name="add" />
            </Col>
          </Row>
          <Row>
            {this.props.products.length > 0 && (
              <FlatList
                data={this.props.products}
                renderItem={({ item }) => (
                  <TouchableWithoutFeedback
                    onPress={() =>
                      this.props.nav.navigation.navigate(urls.product, {
                        product_id: item.id_produk,
                      })
                    }>
                    <View style={styles.itemContainer}>
                      <Image source={{ uri: item.photo_produk[0] }} style={styles.productImage} />
                      <Text>{item.nama}</Text>
                      <StarRating
                        disabled
                        maxStars={5}
                        rating={parseInt(item.bintang)}
                        starSize={20}
                        fullStarColor={'gold'}
                      />
                      <Text>Rp {convertToCurrency(parseInt(item.harga))}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={item => item.id}
                numColumns={numColumns}
              />
            )}
            {this.props.products.length === 0 && (
              <View style={styles.emptyContainer}>
                <Image source={emptyResult} style={styles.emptyLogo} />
                <Text style={styles.emptyText}>Belum Ada Produk</Text>
              </View>
            )}
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
  },
  itemContainer: {
    width: halfWidth,
    height: halfWidth,
    margin: 3,
    alignItems: 'center',
  },
  productImage: {
    width: halfWidth * 0.7,
    height: halfWidth * 0.6,
    marginTop: 15,
  },
  spin: {
    paddingVertical: 6,
    width: width * 0.25,
    height: width * 0.25,
    marginLeft: (width * 0.75) / 2,
    marginRight: (width * 0.75) / 2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyLogo: {
    width: width * 0.5,
    height: width * 0.5,
  },
  emptyText: {
    fontSize: 15,
  },
});

export default Shop;
