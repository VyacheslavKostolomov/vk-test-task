import FactForm from "../../components/FactRequester";
import AgeForm from "../../components/AgeForm";
import { View, Panel, Group, CellButton, PanelHeader } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { useState } from "react";

const MainPage = () => {
  const [activePanel, setActivePanel] = useState("1");
  
  return (
    <View activePanel={activePanel}>
      <Panel id="1">
        <PanelHeader>Здесь вы можете узнать интересные факты</PanelHeader>
        <Group>
        <FactForm />
          <CellButton onClick={() => setActivePanel("2")}>
            Перейти ко 2 панели
          </CellButton>
        </Group>
      </Panel>
      <Panel id="2">
        <PanelHeader>Здесь вы можете узнать возраст по имени</PanelHeader>
        <Group>
      <AgeForm />
          <CellButton onClick={() => setActivePanel("1")}>
            Вернуться к 1 панели
          </CellButton>
        </Group>
      </Panel>
    </View>
  );
};

export default MainPage;
