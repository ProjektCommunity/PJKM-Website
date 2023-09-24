<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultViewLayout from '../components/generics/DefaultViewLayout.vue'
import AccordionList, { AccordionListData } from "../components/generics/AccordionList.vue";
import { ref } from 'vue'

const myData= ref<AccordionListData[]>([]);
myData.value.push(new AccordionListData(500));
myData.value.push(new AccordionListData(100));

// Functions in the dataTypes can be invoked:
myData.value[0].myFunction("Cool");

function PlayVideo() {
	var videoPlayer = document.getElementById('VideoPlayer')
	videoPlayer?.classList.add("show")
}
</script>

<template>
	<div>
		<v-row justify="center" align="center" style="height: 100vh">
			<v-col style="width: fit-content">
				<v-fade-transition mode="out-in">
					<v-img src="src/assets/logos/PJKT-05(fade).png" height="700" class="text-center">
						<div style="height: 100%; width: 100%; flex-direction: column;"
							class="d-flex justify-center align-center text-h1 mono" justify="center" align="center">
							<v-row class="my-0">
								<v-col align-self="end">
									<strong>Coming June 2023</strong>
								</v-col>
							</v-row>
							<v-row class="my-0">
								<v-col align-self="start">
									<!-- <a href="https://youtube.com" target="_blank"><v-btn>
											Watch our announcement video
										</v-btn>
									</a> -->
								</v-col>
							</v-row>
						</div>
					</v-img>
				</v-fade-transition>
			</v-col>
		</v-row>
		<default-view-layout>
			<accordion-list title="My List" :items="myData" />
		</default-view-layout>
	</div>

</template>

<style>
.hide {
	display: none;
}

.show {
	display: block;
}
</style>
