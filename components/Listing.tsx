import { View, Text, FlatList, ListRenderItem, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { defaultStyles } from '@/constants/Styles';
import { Link } from 'expo-router';
import { listing } from '@/interfaces/listing';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';



interface Props {
    listing: any[];
    category: string;
}

const Listing = ({ listing:items, category }: Props) => {
const [loading ,setLoading] = useState(false);
const listRef = useRef<FlatList>(null);

    useEffect(() => {
        console.log("Reloading Listing:",items.length);
        setLoading(true);

        setTimeout(()=>{
            setLoading(false);
        },200)
    }, [category])

    const renderRow: ListRenderItem<listing> =({item}) =>(
        <Link href ={`/listing/${item.id}`} asChild>
            {/* Go there */}
            <TouchableOpacity>
                <Animated.View style={styles.listing}entering={FadeInRight} exiting={FadeOutLeft}>
                {/* <View style={styles.listing}> */}
                    <Image source={{uri:item.medium_url}} style={styles.image} />
                    <TouchableOpacity style={{position:'absolute',right:30,top:30}}>
                        <Ionicons name='heart-outline' size={24} color={'#000'}/>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:12,fontFamily:'mon-sb'}}>{item.name}</Text>
                        <View style={{flexDirection:'row',gap:4}}>
                            <Ionicons name='star' size={12}/>
                            <Text style={{fontFamily:'mon-sb'}}>{item.review_scores_rating/20}</Text>
                        </View>
                    </View>
                    <Text style={{fontFamily:'mon'}}>{item.room_type}</Text>

                    <View style={{flexDirection:'row',gap:4}}>
                    <Text style={{fontFamily:'mon-sb'}}> $ {item.price}</Text>
                    <Text style={{fontFamily:'mon'}}>night</Text>
                    </View>
                </Animated.View>
                {/* </View> */}
            </TouchableOpacity>
            </Link>
    )

    return (
        <View style={defaultStyles.container}>
           <FlatList renderItem={renderRow} ref={listRef} data={loading?[]:items}/>
        </View>
    )
}

const styles = StyleSheet.create({
    listing:{
        padding:16,
        gap:10,
        marginVertical:16
    },
    image:{
        width:'100%',
        height:300,
        borderRadius:10
    }
})


export default Listing