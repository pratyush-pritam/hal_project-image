import Toast from "react-native-toast-message";
import Navigation from "./StackNavigator";
import { SafeAreaView } from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/action";
import Loader from "./components/Loader";
import firestore from "@react-native-firebase/firestore"; 
import { LogBox } from "react-native";
LogBox.ignoreAllLogs();

const Main = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);
  const getData = async () => {
    const dr = await firestore().collection("SUM_Hospital").get();
    const drData = dr.docs.map((doc) => doc.data().nameOfDoctor);

    console.log(drData);
  };
  useEffect(() => {
    getData();
    dispatch(loadUser());
  }, [dispatch]);
  if (!user && loading) return <Loader height={100} width={100} color="black" />
 
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
        <Toast />
      </SafeAreaView>
    </>
  );
};

export default Main;
