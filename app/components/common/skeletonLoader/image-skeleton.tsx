import { useState } from "react";
import { Image, Text, View } from "react-native";

const BookImageWithSkeleton = ({
  uri,
  containerStyle,
}: {
  uri?: string;
  containerStyle: any;
}) => {
  const fallbackImg = "https://via.placeholder.com/100x150.png?text=No+Image";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={[containerStyle, { overflow: "hidden" }]}>
      {/* Skeleton overlay while loading and no error */}
      {loading && !error && (
        <Text style={{ position: "absolute" }}>Loading...</Text>
      )}
      <Image
        source={{ uri: error ? fallbackImg : uri || fallbackImg }}
        style={{ width: "100%", height: "100%", opacity: loading ? 0 : 1 }}
        resizeMode="cover"
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </View>
  );
};

export default BookImageWithSkeleton;
