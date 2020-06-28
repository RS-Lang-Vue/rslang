<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <v-card class="mx-auto text-start" max-width="700">
          <v-card-title class="cyan darken-1">
            <div class="dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>

            <span class="white--text">новое слово</span>

            <v-spacer></v-spacer>

            <v-btn dark icon title="Удалить слово из изучаемых">
              <v-icon>mdi-delete-outline</v-icon>
            </v-btn>
          </v-card-title>

          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text>
              <span class="text-sm-h4 text-h5">
                camera
              </span>
              <p class="text-body-1">
                [kǽmərə]
              </p>
              <div class="text-subtitle-1">камера</div>
            </v-card-text>
            <v-avatar class="ma-3" size="125" tile>
              <v-img src="@/assets/images/apartment.jpg"></v-img>
            </v-avatar>
          </div>

          <!-- <v-divider></v-divider> -->
          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2">A camera is a piece of equipment that takes picturesа</p>
              <p class="text-body-2 mb-0">Камера - это часть оборудования, которая делает снимки</p>
            </v-card-text>
          </div>

          <div class="d-flex flex-no-wrap justify-space-between align-center">
            <v-btn icon class="ma-2">
              <v-icon>mdi-volume-high</v-icon>
            </v-btn>
            <v-card-text class="text-body-1">
              <p class="text-body-1 mb-2">I brought my camera on my vacation</p>
              <p class="text-body-2 mb-0">Я принес свою камеру в отпуск</p>
            </v-card-text>
          </div>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn text color="deep-purple accent-4">
              показать ответ
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn text color="deep-purple accent-4">
              дальше
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({}),
};
</script>

<style scope>
.dots {
  margin-right: 0.5rem;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  margin-right: 0.3rem;
}

.dot:nth-child(1) {
  background-color: orange;
}
</style>
