import axios from "axios";
import AquaticClassAxieModel from "../../models/AquaticClassAxie.model.js";
import BeastClassAxieModel from "../../models/BeastClassAxie.model.js";
import BirdClassAxieModel from "../../models/BirdClassAxie.model.js";
import BugClassAxieModel from "../../models/BugClassAxie.model.js";
import DawnClassAxieModel from "../../models/DawnClassAxie.model.js";
import DuskClassAxieModel from "../../models/DuskClassAxie.model.js";
import MechClassAxieModel from "../../models/MechClassAxie.model.js";
import PlantClassAxieModel from "../../models/PlantClassAxie.model.js";
import ReptileClassAxieModel from "../../models/ReptileClassAxie.model.js";
import { FetchAllAxiesQuery } from "../../utils/helpers/axies/queries.js";

export default class AxieService {
  async GetAxiesFromOtherSource() {
    try {
      const response = await axios
        .post(
          "https://graphql-gateway.axieinfinity.com/graphql",
          FetchAllAxiesQuery
        )
        .then(({ data }) => data?.data);

      //  then store each Axie's ID, name, stage, class, and current price (converted to USD) as documents in their respective DB collections
      const beast_class = [];
      const aquatic_class = [];
      const plant_class = [];
      const bird_class = [];
      const bug_class = [];
      const reptile_class = [];
      const mech_class = [];
      const dawn_class = [];
      const dusk_class = [];

      // Current price in USD produce an error during query, I just hardcoded a default value of 0

      if (response?.axies) {
        response.axies.results.forEach(
          ({ id, name, stage, class: useClass }) => {
            if (useClass === "Beast") {
              beast_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Aquatic") {
              aquatic_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Plant") {
              plant_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Bird") {
              bird_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Bug") {
              bug_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Reptile") {
              reptile_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Mech") {
              mech_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Dawn") {
              dawn_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            } else if (useClass === "Dusk") {
              dusk_class.push({
                axie_id: id,
                name: name || "Unknown",
                stage,
                class: useClass,
                current_price: 0,
              });
            }
          }
        );
      }

      const aquaticPromise = await AquaticClassAxieModel.insertMany(
        aquatic_class
      );
      const beastPromise = await BeastClassAxieModel.insertMany(beast_class);
      const birdPromise = await BirdClassAxieModel.insertMany(bird_class);
      const bugPromise = await BugClassAxieModel.insertMany(bug_class);
      const dawnPromise = await DawnClassAxieModel.insertMany(dawn_class);
      const duskPromise = await DuskClassAxieModel.insertMany(dusk_class);
      const mechPromise = await MechClassAxieModel.insertMany(mech_class);
      const plantPromise = await PlantClassAxieModel.insertMany(plant_class);
      const reptilePromise = await ReptileClassAxieModel.insertMany(
        reptile_class
      );
      const promises = [
        beastPromise,
        aquaticPromise,
        plantPromise,
        birdPromise,
        bugPromise,
        reptilePromise,
        mechPromise,
        dawnPromise,
        duskPromise,
      ];

      if (
        beast_class.length ||
        aquatic_class.length ||
        plant_class.length ||
        bird_class.length ||
        bug_class.length ||
        reptile_class.length ||
        mech_class.length ||
        dawn_class.length ||
        dusk_class.length
      ) {
        await Promise.all(promises);
      }
      return { message: "Success", status: 200 };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }

  async GetAxiesFromDatabase() {
    try {
      const aquaticPromise = await AquaticClassAxieModel.find({});
      const beastPromise = await BeastClassAxieModel.find({});
      const birdPromise = await BirdClassAxieModel.find({});
      const bugPromise = await BugClassAxieModel.find({});
      const dawnPromise = await DawnClassAxieModel.find({});
      const duskPromise = await DuskClassAxieModel.find({});
      const mechPromise = await MechClassAxieModel.find({});
      const plantPromise = await PlantClassAxieModel.find({});
      const reptilePromise = await ReptileClassAxieModel.find({});
      const promises = [
        beastPromise,
        aquaticPromise,
        plantPromise,
        birdPromise,
        bugPromise,
        reptilePromise,
        mechPromise,
        dawnPromise,
        duskPromise,
      ];

      const [
        beast_class,
        aquatic_class,
        plant_class,
        bird_class,
        bug_class,
        reptile_class,
        mech_class,
        dawn_class,
        dusk_class,
      ] = await Promise.all(promises);

      const allAxies = [
        ...beast_class,
        ...aquatic_class,
        ...plant_class,
        ...bird_class,
        ...bug_class,
        ...reptile_class,
        ...mech_class,
        ...dawn_class,
        ...dusk_class,
      ];
      if (allAxies.length) {
        return { message: "Success", status: 200, data: allAxies };
      }
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }

  async AddAxie({
    axie_id,
    name,
    stage = 4,
    class: useClass,
    current_price = 0,
  }) {
    if (
      ![
        "beast",
        "aquatic",
        "plant",
        "bird",
        "bug",
        "reptile",
        "mech",
        "dawn",
        "dusk",
      ].includes(String(useClass).toLocaleLowerCase())
    ) {
      return { message: "Invalid Axie Type", status: 400 };
    }
    let response;
    const useType =
      String(useClass).charAt(0).toUpperCase() + String(useClass).slice(1);
    try {
      if (useClass === "Beast") {
        response = await BeastClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Aquatic") {
        response = await AquaticClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Plant") {
        response = await PlantClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Bird") {
        response = await BirdClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Bug") {
        response = await BugClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Reptile") {
        response = await ReptileClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Mech") {
        response = await MechClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Dawn") {
        response = await DawnClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      } else if (useClass === "Dusk") {
        response = await DuskClassAxieModel.create({
          axie_id,
          name,
          stage,
          class: useType,
          current_price,
        });
      }
      if (response) {
        return { message: "Success", status: 200 };
      }
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }
}
