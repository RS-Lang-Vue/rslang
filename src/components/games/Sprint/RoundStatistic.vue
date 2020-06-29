<template>
  <v-dialog v-model="roundModalActive" persistent max-width="40vw">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('closeModal')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Правильных</th>
              <th class="text-left">Ошибок</th>
              <th class="text-left">Лучший стрик</th>
              <th class="text-left">Результат</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ statistic.correct }}</td>
              <td>{{ statistic.wrong }}</td>
              <td>{{ statistic.streak }}</td>
              <td>{{ statistic.correct }} / {{ statistic.correct + statistic.wrong }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="comments">
        <div class="stupid" v-if="statistic.correct < 5">
          <div class="comment__text">
            <span>Никто не идеален</span>
          </div>
          <img src="../../../assets/images/sprint/stupid.png" alt="" />
        </div>
        <div class="germany" v-else-if="statistic.correct < 10">
          <div class="comment__text">
            <span>Может лучше немецкий?</span>
          </div>
          <img src="../../../assets/images/sprint/germany.png" alt="" />
        </div>
        <div class="warrior" v-else-if="statistic.correct < 15">
          <div class="comment__text">
            <span>Да ты настоящий боец</span>
          </div>
          <img src="../../../assets/images/sprint/boec.png" alt="" />
        </div>
        <div class="awesome" v-else>
          <div class="comment__text">
            <span>Вы восхитительны</span>
          </div>
          <img src="../../../assets/images/sprint/awesom.png" alt="" />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["roundModalActive", "statistic"],
};
</script>

<style scoped>
.stupid,
.germany,
.warrior,
.awesome {
  display: flex;
  align-items: center;
  justify-content: center;
}
.comment__text {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
}
</style>
