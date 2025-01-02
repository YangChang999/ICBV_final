<template>
  <section class="pt-xl-8">
    <b-container>
      <b-row class="g-4 g-xxl-5">
        <b-col xl="9" class="mx-auto">
          <img :src="bg02" class="rounded" alt="contact-bg" />

          <b-row class="mt-n5 mt-sm-n7 mt-md-n8">
            <b-col cols="11" lg="9" class="mx-auto">
              <b-card no-body class="shadow p-4 p-sm-5 p-md-6">
                <b-card-header class="border-bottom px-0 pt-0 pb-5">
                  <nav class="mb-3" aria-label="breadcrumb">
                    <ol class="breadcrumb breadcrumb-dots pt-0">
                      <li class="breadcrumb-item"><a href="#">Home</a></li>
                      <li class="breadcrumb-item active" aria-current="page">Contact us</li>
                    </ol>
                  </nav>

                  <h1 class="mb-3 h3">Leave your message if you have any doubts</h1>
                  <p class="mb-0">You can reach us anytime vias <a href="#">example@gmail.com</a></p>
                </b-card-header>     
                  <b-form class="px-0 pb-0 pt-5">
                    <div class="input-floating-label form-floating mb-4">
                      <input
                        v-model="formData.name"
                        type="text"
                        class="form-control bg-transparent"
                        id="floatingName"
                        placeholder="Your name"
                      />
                      <label for="floatingName">Your name</label>
                    </div>

                    <div class="input-floating-label form-floating mb-4">
                      <input
                        v-model="formData.email"
                        type="email"
                        class="form-control bg-transparent"
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput">Email address</label>
                    </div>

                    <div class="input-floating-label form-floating mb-4">
                      <input
                        v-model="formData.phone"
                        type="text"
                        class="form-control bg-transparent"
                        id="floatingNumber"
                        placeholder="Phone number"
                      />
                      <label for="floatingNumber">Phone number</label>
                    </div>

                    <div class="input-floating-label form-floating mb-4">
                      <textarea
                        v-model="formData.message"
                        class="form-control bg-transparent"
                        placeholder="Leave a comment here"
                        id="floatingTextarea2"
                        style="height: 100px"
                      ></textarea>
                      <label for="floatingTextarea2">Message</label>
                    </div>

                    <b-button size="lg" variant="primary" class="mb-0" @click="sendMessage">
                      Send a message
                    </b-button>
                  </b-form>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import bg02 from '@/assets/images/bg/02.jpg'
import { reactive } from 'vue';
import axios from 'axios';

// Define the form data type
interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Reactive form data object
const formData = reactive<FormData>({
  name: '',
  email: '',
  phone: '',
  message: ''
});

// Function to send the message
const sendMessage = async () => {
  try {
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields: Name, Email, and Message.');
      return;
    }

    // Send POST request
    const response = await axios.post('http://localhost:3000/contact', formData);

    // Handle successful response
    alert('Message sent successfully!');
    console.log(response.data);

    // Clear form after submission
    formData.name = '';
    formData.email = '';
    formData.phone = '';
    formData.message = '';
  } catch (error) {
    // Handle errors
    console.error('Error sending message:', error);
    alert('Failed to send the message. Please try again later.');
  }
};
</script>
