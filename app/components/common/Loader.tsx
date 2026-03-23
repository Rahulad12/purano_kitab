import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

const LOADING_PHRASES = [
  "Dusting off the shelves...",
  "Turning the pages...",
  "Finding rare editions...",
  "Cataloguing old stories...",
  "Browsing the stacks...",
];

export default function BookLoader() {
  // Book flip animation
  const flipAnim = useRef(new Animated.Value(0)).current;
  // Fade in for text
  const fadeAnim = useRef(new Animated.Value(0)).current;
  // Dots animation
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 =
    useRef(new Animated.Value(0)).current ||
    useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;
  // Dust particle floats
  const dustY1 = useRef(new Animated.Value(0)).current;
  const dustY2 = useRef(new Animated.Value(0)).current;
  const dustOpacity1 = useRef(new Animated.Value(0)).current;
  const dustOpacity2 = useRef(new Animated.Value(0)).current;

  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const phraseFade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Book page flip loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(flipAnim, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(flipAnim, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Fade in overall
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Dots bounce
    const dotDelay = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, {
            toValue: -8,
            duration: 300,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.delay(600),
        ]),
      ).start();

    dotDelay(dot1, 0);
    dotDelay(dot2, 200);
    dotDelay(dot3Anim, 400);

    // Dust particles
    const floatDust = (
      yAnim: Animated.Value,
      opAnim: Animated.Value,
      delay: number,
    ) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(yAnim, {
              toValue: -40,
              duration: 2200,
              easing: Easing.out(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.timing(opAnim, {
                toValue: 0.7,
                duration: 600,
                useNativeDriver: true,
              }),
              Animated.timing(opAnim, {
                toValue: 0,
                duration: 1600,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.timing(yAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };

    floatDust(dustY1, dustOpacity1, 400);
    floatDust(dustY2, dustOpacity2, 1300);

    // Cycle phrases
    const interval = setInterval(() => {
      Animated.timing(phraseFade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        setPhraseIndex((i) => (i + 1) % LOADING_PHRASES.length);
        Animated.timing(phraseFade, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const pageRotate = flipAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-30deg"],
  });

  const pageShadowOpacity = flipAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.08, 0.22, 0.08],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Paper texture overlay lines */}
      {[...Array(14)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.paperLine,
            { top: 60 + i * 52, opacity: 0.03 + (i % 3) * 0.01 },
          ]}
        />
      ))}

      {/* Ornamental corner top-left */}
      <Text style={styles.cornerTL}>✦</Text>
      <Text style={styles.cornerTR}>✦</Text>
      <Text style={styles.cornerBL}>✦</Text>
      <Text style={styles.cornerBR}>✦</Text>

      {/* Book illustration */}
      <View style={styles.bookWrapper}>
        {/* Dust particles */}
        <Animated.View
          style={[
            styles.dust,
            {
              left: 30,
              bottom: 70,
              transform: [{ translateY: dustY1 }],
              opacity: dustOpacity1,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dust,
            {
              left: 80,
              bottom: 60,
              width: 4,
              height: 4,
              transform: [{ translateY: dustY2 }],
              opacity: dustOpacity2,
            },
          ]}
        />

        {/* Book body */}
        <View style={styles.book}>
          {/* Spine */}
          <View style={styles.spine} />

          {/* Pages stack */}
          <View style={styles.pagesStack}>
            {[...Array(5)].map((_, i) => (
              <View
                key={i}
                style={[
                  styles.pageStatic,
                  { right: i * 2, bottom: i * 1, opacity: 1 - i * 0.12 },
                ]}
              />
            ))}

            {/* Flipping page */}
            <Animated.View
              style={[
                styles.pageFlip,
                {
                  transform: [{ perspective: 300 }, { rotateY: pageRotate }],
                },
              ]}
            >
              {/* Page lines */}
              {[...Array(5)].map((_, i) => (
                <View key={i} style={[styles.pageLine, { top: 10 + i * 10 }]} />
              ))}
            </Animated.View>

            {/* Page shadow */}
            <Animated.View
              style={[styles.pageShadow, { opacity: pageShadowOpacity }]}
            />
          </View>

          {/* Book cover back */}
          <View style={styles.bookCoverBack} />

          {/* Bookmark ribbon */}
          <View style={styles.bookmark}>
            <View style={styles.bookmarkTip} />
          </View>
        </View>

        {/* Book shadow */}
        <View style={styles.bookShadow} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Purano Kitab</Text>
      <Text style={styles.subtitle}>— Est. in the Age of Ink & Paper —</Text>

      {/* Loading phrase */}
      <Animated.Text style={[styles.phrase, { opacity: phraseFade }]}>
        {LOADING_PHRASES[phraseIndex]}
      </Animated.Text>

      {/* Animated dots */}
      <View style={styles.dotsRow}>
        {[dot1, dot2, dot3Anim].map((d, i) => (
          <Animated.View
            key={i}
            style={[styles.dot, { transform: [{ translateY: d }] }]}
          />
        ))}
      </View>

      {/* Ornamental divider */}
      <Text style={styles.divider}>— ❦ —</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: "#1C1208",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  paperLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#C4A96A",
  },
  cornerTL: {
    position: "absolute",
    top: 24,
    left: 24,
    color: "#9B7A3B",
    fontSize: 18,
    opacity: 0.5,
  },
  cornerTR: {
    position: "absolute",
    top: 24,
    right: 24,
    color: "#9B7A3B",
    fontSize: 18,
    opacity: 0.5,
  },
  cornerBL: {
    position: "absolute",
    bottom: 24,
    left: 24,
    color: "#9B7A3B",
    fontSize: 18,
    opacity: 0.5,
  },
  cornerBR: {
    position: "absolute",
    bottom: 24,
    right: 24,
    color: "#9B7A3B",
    fontSize: 18,
    opacity: 0.5,
  },

  bookWrapper: {
    alignItems: "center",
    marginBottom: 36,
  },
  book: {
    width: 110,
    height: 140,
    position: "relative",
    flexDirection: "row",
  },
  spine: {
    width: 18,
    height: 140,
    backgroundColor: "#6B3F1A",
    borderRadius: 3,
    borderRightWidth: 2,
    borderRightColor: "#3D1F08",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  pagesStack: {
    flex: 1,
    position: "relative",
  },
  pageStatic: {
    position: "absolute",
    top: 6,
    left: 4,
    right: 0,
    bottom: 6,
    backgroundColor: "#F5EDD6",
    borderRadius: 1,
  },
  pageFlip: {
    position: "absolute",
    top: 6,
    left: 4,
    right: 0,
    bottom: 6,
    backgroundColor: "#EEE0C0",
    borderRadius: 1,
    transformOrigin: "left center",
    padding: 8,
  },
  pageLine: {
    position: "absolute",
    left: 8,
    right: 8,
    height: 1.5,
    backgroundColor: "#C4A87A",
    opacity: 0.5,
    borderRadius: 1,
  },
  pageShadow: {
    position: "absolute",
    top: 6,
    left: 4,
    right: 0,
    bottom: 6,
    backgroundColor: "#1C1208",
    borderRadius: 1,
  },
  bookCoverBack: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 92,
    height: 140,
    backgroundColor: "#5A3216",
    borderRadius: 2,
    zIndex: -1,
  },
  bookmark: {
    position: "absolute",
    top: -12,
    right: 18,
    width: 12,
    height: 36,
    backgroundColor: "#A0291B",
    zIndex: 10,
  },
  bookmarkTip: {
    position: "absolute",
    bottom: -7,
    left: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#A0291B",
  },
  bookShadow: {
    marginTop: 4,
    width: 110,
    height: 12,
    backgroundColor: "#0A0603",
    borderRadius: 50,
    opacity: 0.55,
  },
  dust: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#C4A96A",
  },

  title: {
    fontFamily: "serif",
    fontSize: 32,
    color: "#D4A85A",
    letterSpacing: 3,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  subtitle: {
    fontFamily: "serif",
    fontSize: 11,
    color: "#8B6E3C",
    letterSpacing: 2,
    marginTop: 4,
    marginBottom: 28,
    fontStyle: "italic",
  },
  phrase: {
    fontFamily: "serif",
    fontSize: 15,
    color: "#C4A97A",
    fontStyle: "italic",
    letterSpacing: 0.5,
    marginBottom: 16,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    height: 24,
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9B7A3B",
  },
  divider: {
    color: "#6B4E22",
    fontSize: 16,
    letterSpacing: 6,
    opacity: 0.7,
  },
});
