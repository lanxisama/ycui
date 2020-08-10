
<template>
  <div class="ipos">
    <aia-row>
      <aia-col :xs="24" :sm="24" :md="24">
        <uploadImage
          :uploadType="avatar"
          :initImage="avatarImageUrl"
          @handleAvatarSuccess="handleAvatarSuccess"
          ref="avatarImg"
        >
          <h4
            class="el-upload__tip"
            slot="tip"
          >{{this.$t("ipos.prospect.newProspects.uploadPicture")}}</h4>
          <svg class="icon iconfont" aria-hidden="true" v-if="!avatarImageUrl">
            <use xlink:href="#icon-userphoto_2-prime11" />
          </svg>
          <svg
            class="icon icon-s iconfont position-fixed"
            aria-hidden="true"
            v-if="!avatarImageUrl"
          >
            <use xlink:href="#icon-Group4" />
          </svg>
        </uploadImage>
      </aia-col>
    </aia-row>
    <aia-form
      class="edit-form"
      label-position="top"
      :rules="rules"
      :model="ruleForm"
      ref="customerForm"
    >
      <aia-row :gutter="30">
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item :label="this.$t('ipos.title')" prop="title.code">
            <com-select
              v-model="ruleForm.title"
              @change="changeGender"
              :value="ruleForm.title"
              value-key="code"
              :popper-class="'ipos-select'"
              clearable
            >
              <aia-option
                v-for="item in titleList"
                :label="item.name"
                :value="item"
                :key="item.code"
              ></aia-option>
            </com-select>
          </aia-form-item>
        </aia-col>
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item :label="this.$t('ipos.given_name')" prop="givenName">
            <aia-input
              autocapitalize="off"
              autocorrect="off"
              clearable
              v-model="ruleForm.givenName"
              maxlength="60"
              class="name-input"
              @change="getInitialsName"
              show-word-limit
              @input="ruleForm.givenName=ruleForm.givenName.replace(/[^A-Za-z ]*$/g,'').replace(/\s\s+/g, ' ').replace(/\./g, '')"
              @blur="ruleForm.givenName=ruleForm.givenName.trim()"
            ></aia-input>
          </aia-form-item>
        </aia-col>
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item :label="this.$t('ipos.Last_name')" prop="lastName">
            <aia-input
              autocapitalize="off"
              autocorrect="off"
              clearable
              v-model="ruleForm.lastName"
              maxlength="40"
              show-word-limit
              class="name-input"
              @change="getInitialsName"
              @input="ruleForm.lastName=ruleForm.lastName.replace(/[^A-Za-z ]*$/g,'').replace(/\s\s+/g, ' ').replace(/\./g, '')"
              @blur="ruleForm.lastName=ruleForm.lastName.trim()"
            ></aia-input>
          </aia-form-item>
        </aia-col>
      </aia-row>
      <!-- 2-line -->
      <aia-row :gutter="30">
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item :label="this.$t('ipos.name_with_initials')">
            <aia-input
              autocapitalize="off"
              autocorrect="off"
              clearable
              disabled
              class="name-input"
              v-model="ruleForm.nameWithinitials"
              maxlength="60"
              show-word-limit
              @input="ruleForm.nameWithinitials=ruleForm.nameWithinitials.replace(/[^\a-\z\A-\Z ]/g,'')"
            ></aia-input>
          </aia-form-item>
        </aia-col>
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-row :gutter="10">
            <aia-col :xs="24" :sm="16" :md="16">
              <aia-form-item :label="this.$t('ipos.date_of_birth')" prop="dob">
                <aia-date-picker
                  type="date"
                  v-model="ruleForm.dob"
                  style="width: 100%;"
                  format="dd/MM/yyyy"
                  :editable="false"
                  value-format="timestamp"
                  :placeholder="this.$t('ipos.date_of_birth')"
                  @change="getAge"
                  :picker-options="pickerOptions"
                  @clear="getAge"
                ></aia-date-picker>
              </aia-form-item>
            </aia-col>
            <aia-col :xs="24" :sm="8" :md="8">
              <aia-form-item :label="this.$t('ipos.age')">
                <aia-input
                  autocapitalize="off"
                  autocorrect="off"
                  clearable
                  v-model="ruleForm.age"
                  disabled
                  maxlength="3"
                ></aia-input>
              </aia-form-item>
            </aia-col>
          </aia-row>
        </aia-col>
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item :label="this.$t('ipos.gender')" prop="gender.code">
            <aia-radio-group
              v-model="ruleForm.gender.code"
              class="gender_radioGroup"
              :class="{'is-invalide':addInvalidaClass}"
              @change="validate"
            >
              <aia-radio-button
                v-for="(item,index) in genderList"
                :key="index"
                :label="item.code"
                @click.native.prevent="objectRadio(item,'gender')"
              >{{item.name}}</aia-radio-button>
            </aia-radio-group>
          </aia-form-item>
        </aia-col>
      </aia-row>
      <!-- 3-line -->
      <aia-row :gutter="30">
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item :label="this.$t('ipos.mobile_no')" prop="mobileNo">
            <aia-input
              autocapitalize="off"
              autocorrect="off"
              clearable
              @input="ruleForm.mobileNo=ruleForm.mobileNo.replace(/[^\d]/g,'')"
              maxlength="10"
              minlength="10"
              v-model="ruleForm.mobileNo"
              show-word-limit
              @blur="changeMobile"
              type="tel"
            >
              <template slot="prepend">+94</template>
            </aia-input>
          </aia-form-item>
        </aia-col>
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item label="Mobile No. Verification Code">
            <aia-input
              autocapitalize="off"
              autocorrect="off"
              clearable
              v-model="ruleForm.verificationCode"
              class="input-with-select"
              maxlength="20"
              type="tel"
              show-word-limit
              @input="ruleForm.mobileNo=ruleForm.mobileNo.replace(/[^\d]/g,'')"
              @change="changeVerificationCode"
            >
              <aia-button
                slot="append"
                @click="sendCode()"
                :disabled="sendCodeDisabled"
              >{{sendCodeBtnText}}</aia-button>
            </aia-input>
          </aia-form-item>
        </aia-col>
        <aia-col :xs="24" :sm="8" :md="8">
          <aia-form-item :label="this.$t('ipos.prospect.contact_location')" prop="contactLocation">
            <aia-input
              autocapitalize="off"
              autocorrect="off"
              clearable
              v-model="ruleForm.contactLocation"
              maxlength="50"
              show-word-limit
            ></aia-input>
          </aia-form-item>
        </aia-col>
      </aia-row>
      <aia-row :gutter="30">
        <aia-col :xs="24" :sm="16" :md="16">
          <aia-row :gutter="30">
            <aia-col :xs="24" :sm="12" :md="12" v-if="userChannel=='agency'">
              <aia-form-item :label="this.$t('ipos.prospect.newProspects.wp_code')">
                <aia-input
                  autocapitalize="off"
                  autocorrect="off"
                  clearable
                  disabled
                  v-model="wpCode"
                  maxlength="50"
                  show-word-limit
                ></aia-input>
              </aia-form-item>
            </aia-col>
            <aia-col :xs="24" :sm="12" :md="12" v-if="userChannel=='agency'">
              <aia-form-item
                :label="this.$t('ipos.prospect.newProspects.client_code')"
                prop="clientCode"
              >
                <aia-input
                  autocapitalize="off"
                  autocorrect="off"
                  clearable
                  v-model="ruleForm.clientCode"
                  maxlength="50"
                  show-word-limit
                  @input.native="ruleForm.clientCode=ruleForm.clientCode.replace(/[^\d]/g,'')"
                ></aia-input>
              </aia-form-item>
            </aia-col>
            <aia-col :xs="24" :sm="12" :md="12" v-if="userChannel==='banca'">
              <aia-form-item :label="this.$t('ipos.branch')" prop="branch">
                <com-select
                  v-model="ruleForm.branch"
                  clearable
                  value-key="code"
                  :popper-class="'ipos-select'"
                  @change="validate"
                >
                  <aia-option
                    v-for="item in branchList"
                    :label="item.name"
                    :value="item"
                    :key="item.code"
                  ></aia-option>
                </com-select>
              </aia-form-item>
            </aia-col>
            <aia-col :xs="24" :sm="12" :md="12" v-if="userChannel==='banca'">
              <aia-form-item :label="this.$t('ipos.prospect.introducer_code')">
                <aia-input
                  autocapitalize="off"
                  autocorrect="off"
                  clearable
                  v-model="ruleForm.introducerCode"
                  maxlength="50"
                  show-word-limit
                  placeholder="Populated based on branch"
                ></aia-input>
              </aia-form-item>
            </aia-col>
          </aia-row>
          <aia-row>
            <aia-row :gutter="30">
              <aia-col :xs="24" :sm="12" :md="12">
                <aia-form-item :label="this.$t('ipos.prospect.newProspects.tag')" prop="tag">
                  <aia-radio-group
                    v-model="ruleForm.tag.code"
                    class="tag_radioGroup"
                    fill="#d31145"
                  >
                    <aia-radio-button
                      v-for="item in tagList"
                      :key="item.id"
                      :label="item.code"
                      class="h4"
                      @click.native.prevent="objectRadio(item,'tag')"
                    >{{item.name}}</aia-radio-button>
                  </aia-radio-group>
                </aia-form-item>
              </aia-col>
            </aia-row>
          </aia-row>
        </aia-col>
        <aia-col :xs="24" :sm="8" :md="8" class="card-8">
          <aia-form-item :label="this.$t('ipos.prospect.newProspects.customer_business_card')">
            <uploadImage
              :uploadType="img"
              :initImage="bisnessCardUrl"
              @handleAvatarSuccess="handleAvatarSuccess"
              ref="uploadBisness"
            >
              <div class="el-upload__text" v-if="!imageUrl">
                <div>
                  <svg class="icon svg-icon center-icon" aria-hidden="true" v-if="!imageUrl">
                    <use xlink:href="#icon-xiangji" />
                  </svg>
                  <span>Add Photo</span>
                </div>
              </div>
            </uploadImage>
          </aia-form-item>
        </aia-col>
      </aia-row>
      <div class="bg-w form-bottom">
        <aia-row :gutter="30">
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item :label="this.$t('ipos.idType')" prop="idType">
              <aia-radio-group
                v-model="ruleForm.idType.code"
                class="gender_radioGroup three-button"
                fill="#d31145"
              >
                <aia-radio-button
                  v-for="(item,index) in idTypeList"
                  :key="index"
                  :label="item.code"
                  @click.native.prevent="objectRadio(item,'idType')"
                >{{item.name}}</aia-radio-button>
              </aia-radio-group>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.id_number')"
              prop="idNumber"
              :rules="ruleForm.idType.code&&ruleForm.idType.code!=''?[{ required: true, message: ' ', trigger: 'change'}]:[{ required: false, message: ' ', trigger: 'change'}]"
            >
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                v-model="ruleForm.idNumber"
                :maxlength="nicMaxlength"
                clearable
                show-word-limit
                @change="changeIdNumber"
                @input.native="ruleForm.idNumber=ruleForm.idNumber.replace(/[^((^\d{12})|(^\d{9}VX$))]/g,'')"
                :disabled="ruleForm.idType.code==''"
              ></aia-input>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item :label="this.$t('ipos.email')" prop="email">
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                @blur="checkEmail"
                v-model="ruleForm.email"
                maxlength="50"
                type="email"
                show-word-limit
              ></aia-input>
            </aia-form-item>
          </aia-col>
        </aia-row>
        <aia-row :gutter="30">
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item :label="this.$t('ipos.occupation')" prop="occupation">
              <occupation :data="ruleForm.occupation" @getOccupation="getOccupation"></occupation>
              <!-- <com-occupation
                v-model="ruleForm.occupation"
                @getOccupation="getOccupation"
                :data="ruleForm.occupation"
              ></com-occupation>-->
              <!-- <aia-select
                v-model="ruleForm.occupation"
                :value="ruleForm.occupation"
                value-key="code"
                filterable
                placeholder="Please select"
                :popper-class="'ipos-select'"
                clearable
              >
                <aia-option
                  v-for="item in ruleForm.occupationList"
                  :label="item.name"
                  :value="item"
                  :key="item.code"
                ></aia-option>
              </aia-select>-->
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.proposal.proposal.country_of_occupation')"
              prop="countryOfOccuption"
            >
              <com-select
                v-model="ruleForm.countryOfOccupation"
                :value="ruleForm.countryOfOccupation"
                value-key="code"
                :popper-class="'ipos-select'"
                clearable
              >
                <aia-option
                  v-for="item in ruleForm.countryOfOccupationList"
                  :label="item.name"
                  :value="item"
                  :key="item.code"
                ></aia-option>
              </com-select>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.proposal.proposal.annual_income')"
              prop="annualIncome"
            >
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                v-model="ruleForm.annualIncome"
                @input="ruleForm.annualIncome=ruleForm.annualIncome.replace(/[^\d]/g,'')"
                maxlength="200"
                show-word-limit
              ></aia-input>
            </aia-form-item>
          </aia-col>
        </aia-row>

        <aia-row :gutter="30">
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item :label="this.$t('ipos.permanent_address')" prop="permanentAddress">
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                v-model="ruleForm.permanemtAddress.line1"
                maxlength="30"
                class="name-input"
                show-word-limit
                @blur="ruleForm.permanemtAddress.line1= ruleForm.permanemtAddress.line1.trim()"
                @input.native="ruleForm.permanemtAddress.line1= ruleForm.permanemtAddress.line1.replace(/[^A-Za-z ,\.-]*$/g,'').replace(/\s\s+/g, ' ')"
              ></aia-input>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.prospect.customerDetails.address_line2')"
              prop="permanentAddressLine2"
            >
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                v-model="ruleForm.permanemtAddress.line2"
                maxlength="30"
                class="name-input"
                show-word-limit
                @blur="ruleForm.permanemtAddress.line2= ruleForm.permanemtAddress.line2.trim()"
                @input.native="ruleForm.permanemtAddress.line2= ruleForm.permanemtAddress.line2.replace(/[^A-Za-z ,\.-]*$/g,'').replace(/\s\s+/g, ' ')"
              ></aia-input>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.prospect.customerDetails.address_line3')"
              prop="permanentAddressLine3"
            >
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                class="name-input"
                v-model="ruleForm.permanemtAddress.line3"
                maxlength="30"
                show-word-limit
                @blur="ruleForm.permanemtAddress.line3= ruleForm.permanemtAddress.line3.trim()"
                @input.native="ruleForm.permanemtAddress.line3= ruleForm.permanemtAddress.line3.replace(/[^A-Za-z ,\.-]*$/g,'').replace(/\s\s+/g, ' ')"
              ></aia-input>
            </aia-form-item>
          </aia-col>
        </aia-row>
        <aia-row :gutter="30">
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.proposal.proposal.correspondance_address')"
              prop="corresAddress"
            >
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                v-model="ruleForm.correspondenceAddress.line1"
                maxlength="30"
                class="name-input"
                show-word-limit
                @blur="ruleForm.correspondenceAddress.line1= ruleForm.correspondenceAddress.line1.trim()"
                @input.native="ruleForm.correspondenceAddress.line1= ruleForm.correspondenceAddress.line1.replace(/[^A-Za-z ,\.-]*$/g,'').replace(/\s\s+/g, ' ')"
              ></aia-input>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.prospect.customerDetails.address_line2')"
              prop="corresAddressLine2"
            >
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                v-model="ruleForm.correspondenceAddress.line2"
                maxlength="30"
                class="name-input"
                show-word-limit
                @blur="ruleForm.correspondenceAddress.line2= ruleForm.correspondenceAddress.line2.trim()"
                @input.native="ruleForm.correspondenceAddress.line2= ruleForm.correspondenceAddress.line2.replace(/[^A-Za-z ,\.-]*$/g,'').replace(/\s\s+/g, ' ')"
              ></aia-input>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item
              :label="this.$t('ipos.prospect.customerDetails.address_line3')"
              prop="corresAddressLine3"
            >
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                v-model="ruleForm.correspondenceAddress.line3"
                maxlength="30"
                class="name-input"
                show-word-limit
                @blur="ruleForm.correspondenceAddress.line3= ruleForm.correspondenceAddress.line3.trim()"
                @input.native="ruleForm.correspondenceAddress.line3= ruleForm.correspondenceAddress.line3.replace(/[^A-Za-z ,\.-]*$/g,'').replace(/\s\s+/g, ' ')"
              ></aia-input>
            </aia-form-item>
          </aia-col>
        </aia-row>

        <aia-row :gutter="30">
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item :label="this.$t('ipos.residential_status')" prop="residentStatus">
              <aia-radio-group v-model="ruleForm.residentialStatus.code" class="gender_radioGroup">
                <aia-radio-button
                  v-for="(item,index) in ruleForm.residentialStatusList"
                  :key="index"
                  :label="item.code"
                  @click.native.prevent="objectRadio(item,'residentialStatus')"
                >{{item.name}}</aia-radio-button>
              </aia-radio-group>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item :label="this.$t('ipos.others')" prop="others">
              <aia-input
                autocapitalize="off"
                autocorrect="off"
                clearable
                v-model="ruleForm.others"
                maxlength="50"
                show-word-limit
                :disabled="ruleForm.residentialStatus.code!='OTH'"
              ></aia-input>
            </aia-form-item>
          </aia-col>
          <aia-col :xs="24" :sm="8" :md="8">
            <aia-form-item :label="this.$t('ipos.marital_status')" prop="maritalStatus">
              <com-select
                clearable
                placeholder="Please select"
                v-model="ruleForm.maritalStatus"
                :value="ruleForm.maritalStatus"
                value-key="code"
                :popper-class="'ipos-select'"
              >
                <aia-option
                  v-for="item in ruleForm.maritalStatusList"
                  :label="item.name"
                  :value="item"
                  :key="item.code"
                ></aia-option>
              </com-select>
            </aia-form-item>
          </aia-col>
        </aia-row>
        <aia-row class="btn-group">
          <button
            class="btn-secondary"
            type="button"
            @click.prevent="cancel"
          >{{this.$t('ipos.cancel')}}</button>
          <button
            class="btn-primary"
            type="button"
            :disabled="saveDisable"
            @click.prevent="save"
          >{{this.$t('ipos.save')}}</button>
        </aia-row>
      </div>
    </aia-form>
    <!-- </aia-dialog> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
import util from "@/utils/ipos/util";
import uploadImage from "@/components/ipos/common/uploadImage.vue";
import comSelect from "@/components/ipos/common/aiaComSelect";
import occupation from "@/components/ipos/common/occupation1";
import branch_cache from "@/service/ipos/cache/branch_cache";
import option_caches from "@/service/ipos/cache/option_caches";
import occupationCaches from "@/service/ipos/cache/occupation_caches.js";
import entity_enums from "@/service/ipos/constant/entity_enums.js";
import { async } from "q";
export default {
  components: {
    uploadImage,
    comSelect,
    occupation
  },
  data() {
    return {
      wpCode: this.$store.state.agentCode,
      clearable: true,
      saveDisable: true,
      showAddDialog: this.showDialog,
      userChannel: this.$store.state.channel,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      sendCodeBtnText: "SEND CODE",
      sendCodeDisabled: true,
      rules: {
        "title.code": [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ],
        branch: [],
        givenName: [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ],
        lastName: [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ],
        dob: [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ],
        "gender.code": [
          {
            required: true,
            message: " ",
            trigger: "change"
          }
        ],
        permanemtAddress: [],
        permanemtAddressLine3: [],
        permanemtAddressLine3: [],
        corresAddress: [],
        corresAddressLine2: [],
        corresAddressLine3: []
      },
      ruleForm: {
        title: { code: "", name: "" },
        occupation: { code: "", name: "" },
        countryOfOccupation: { code: "", name: "" },
        maritalStatus: { code: "", name: "" },
        idType: { code: "", name: "" },
        branch: { code: "", name: "" },
        residentialStatus: { code: "", name: "" },
        givenName: "",
        lastName: "",
        dob: "",
        gender: "",
        maritalStatusList: [],
        genderList: [],
        age: "",
        annualIncome: "",
        others: "",
        branchList: [],
        businessCard: "",
        clientCode: "",
        contactLocation: "",
        correspondenceAddress: { line1: "", line2: "", line3: "" },
        countryOfOccupationList: [],
        email: "",
        gender: "",
        hasFnaFhc: "",
        hasPremium: "",
        hasProposal: "",
        hasQuotation: "",
        idNumber: "",
        introducerCode: "",
        mobileNo: "",
        nameWithinitials: "",
        permanemtAddress: {
          line1: "",
          line2: "",
          line3: ""
        },
        portrait: "",
        residentialStatusList: [],
        tag: {
          code: "",
          name: ""
        },
        titleList: []
      },
      img: "img",
      imageUrl: "",
      avatar: "avatar",
      avatarImageUrl: "",
      bisnessCardUrl: "",
      businessChange: false,
      avatarChange: false,
      nicMaxlength: 50,
      nicRules: "",
      titleList: [],
      tagList: [],
      branchList: [],
      idTypeList: [],
      genderList: [],
      addInvalidaClass: false
    };
  },
  computed: {
    ...mapState({
      prospectId: state => state.prospect.prospectId
    })
  },
  created() {
    this.getOptionsList();
    this.branchList = branch_cache.list();
    this.idTypeList = entity_enums.ProspectIdType.list();
    this.genderList = entity_enums.ProspectGender.list();
    this.prepare();
  },
  mounted() {
    if (this.userChannel == "banca") {
      this.rules.branch = [
        {
          required: true,
          message: " ",
          trigger: "change"
        }
      ];
    } else {
      this.rules.branch = [];
    }
  },
  methods: {
    async getOptionsList() {
      this.titleList = await option_caches.PROSPECT_TITLE.list();
      this.tagList = await option_caches.PROSPECT_TAG.list();
    },
    getOccupation(val) {
      if (val.code) {
        this.ruleForm.occupation = { ...val };
      } else {
        this.ruleForm.occupation = {
          code: "",
          name: ""
        };
      }
    },
    prepare() {
      let params = {
        prospectId: this.$router.currentRoute.query.prospectId
      };
      this.$store.commit(
        "prospect/SET_PROSPECTID",
        this.$router.currentRoute.query.prospectId
      );
      this.$store.dispatch("prospect/GET_CUSTOMER_DETAIL", params).then(res => {
        if (res.code == "0") {
          this.ruleForm = Object.assign(this.ruleForm, res.data.customerInfo);
          this.getAge();
          this.getInitialsName();
          this.setNicRule();
          this.setOthers();
          // this.changeIdNumber();
          let getImageArr = [];
          if (
            void 0 != this.ruleForm.portrait &&
            this.ruleForm.portrait != ""
          ) {
            getImageArr.push("avatar");
          }
          if (
            void 0 != this.ruleForm.businessCard &&
            this.ruleForm.businessCard != ""
          ) {
            getImageArr.push("img");
          }
          let _this = this;
          for (let i = 0; i < getImageArr.length; i++) {
            (function(type) {
              _this.getImage(type);
            })(getImageArr[i]);
          }
        }
      });
    },
    // nic idNumber validate
    changeIdNumber() {
      if (
        this.ruleForm.idType.code == "nic" &&
        !util.isEmpty(this.ruleForm.idNumber)
      ) {
        if (!this.ruleForm.idNumber.match(this.nicRules)) {
          this.validAlert("nic");
        } else {
          this.isDobGenderValid(this.ruleForm.idNumber);
        }
      } else {
        this.validate();
      }
    },
    // common alert
    validAlert(type) {
      this.$alert(this.$t("ipos.error_" + type), "Error", {
        confirmButtonText: "OK",
        customClass: "ipos"
      })
        .then(() => {
          if (type == "nic") {
            this.ruleForm.idNumber = "";
          } else if (type == "dob") {
            this.ruleForm.dob = "";
            this.ruleForm.age = "";
          } else {
            this.ruleForm[type] = "";
          }
          this.validate();
        })
        .catch(() => {});
    },
    // valiadate dob and gender according to nic
    isDobGenderValid(idNumber) {
      console.log(util);
      let checkReult = util.checkDob(idNumber);
      if (checkReult.isCorrect) {
        //dob
        if (util.isEmpty(this.ruleForm.dob)) {
          this.ruleForm.dob = checkReult.dob.getTime();
          this.getAge();
        } else {
          if (this.ruleForm.dob != checkReult.dob.getTime()) {
            this.validAlert("dob");
            return;
          }
        }
        //gender
        if (util.isEmpty(this.ruleForm.gender.code)) {
          entity_enums.ProspectGender.list().forEach(item => {
            if (item.code == checkReult.gender) this.ruleForm.gender = item;
          });
          this.validateGender();
          this.validate();
          return;
        } else {
          if (this.ruleForm.gender.code != checkReult.gender) {
            this.validAlert("gender");
          }
        }
      } else {
        this.validAlert("nic");
      }
    },
    setNicRule() {
      if (this.ruleForm.idType.code == "nic") {
        this.nicRules = /(^\d{12}$)|(^\d{9}[VX]$)/gi;
        this.nicMaxlength = 12;
      } else {
        this.nicRules = "";
        this.nicMaxlength = 50;
      }
    },
    setOthers() {
      if (this.ruleForm.residentialStatus.code != "OTH") {
        this.ruleForm.others = "";
      }
    },
    // radio obj foramt
    objectRadio(obj, type) {
      if (obj.code == this.ruleForm[type].code) {
        this.ruleForm[type] = {
          code: "",
          name: ""
        };
      } else {
        this.ruleForm[type] = obj;
      }
      if (type == "idType") {
        this.ruleForm.idNumber = "";
        this.setNicRule();
        if (this.ruleForm.idNumber) {
          this.changeIdNumber();
        }
      }
      if (type == "residentialStatus") {
        this.setOthers();
      }
      if (type == "gender") {
        if (
          this.ruleForm.gender.code != "" &&
          this.ruleForm.idType.code == "nic" &&
          this.ruleForm.idNumber
        ) {
          this.isNicValid(this.ruleForm.idNumber, "gender");
        }
      }
      setTimeout(() => {
        this.validate();
      }, 0);
    },
    validateGender() {
      let _this = this;
      if (_this.ruleForm.gender.code == "") {
        _this.addInvalidaClass = true;
      } else {
        _this.addInvalidaClass = false;
      }
    },
    //cal age according to dob
    getAge() {
      if (!util.isEmpty(this.ruleForm.dob)) {
        this.ruleForm.age = Number(util.getAge(this.ruleForm.dob));
        if (this.ruleForm.idType.code == "nic" && this.ruleForm.idNumber) {
          this.isNicValid(this.ruleForm.idNumber, "dob");
        }
        this.validate();
      } else {
        this.ruleForm.dob = "";
        this.ruleForm.age = "";
        this.validate();
      }
    },
    isNicValid(idNumber, type) {
      let checkReult = util.checkDob(idNumber);
      if (checkReult.isCorrect) {
        //dob
        if (type == "dob" && this.ruleForm.dob != checkReult.dob.getTime()) {
          this.validAlert("nic");
        }
        //gender
        if (
          type == "gender" &&
          this.ruleForm.gender.code != checkReult.gender
        ) {
          this.validAlert("nic");
        }
      }
      this.validate();
    },
    getImage(uploadType) {
      let imageId = "";
      if (uploadType == "avatar") {
        imageId = this.ruleForm.portrait;
      } else {
        imageId = this.ruleForm.businessCard;
      }
      let params = {
        id: imageId
      };
      this.$store.dispatch("prospect/GET_IMAGE", params).then(res => {
        if (res.code == "0") {
          if (uploadType == "avatar") {
            this.avatarImageUrl = res.data.base64Content;
            this.$refs.avatarImg.avatarImageUrl = res.data.base64Content;
          } else {
            this.imageUrl = res.data.base64Content;
            this.$refs.uploadBisness.avatarImageUrl = res.data.base64Content;
          }
        }
      });
    },
    // get initial name according to given name and last name
    getInitialsName() {
      var str = this.ruleForm.givenName;
      var arr = str.split(" ");
      var fristCode = "";
      arr.forEach((element, index, array) => {
        fristCode += element.substr(0, 1);
      });
      this.ruleForm.nameWithinitials =
        fristCode.toUpperCase() +
        " " +
        this.ruleForm.lastName.replace(
          this.ruleForm.lastName.charAt(0),
          this.ruleForm.lastName.charAt(0).toUpperCase()
        );

      this.validate();
    },
    //email  validate
    checkEmail() {
      if (!util.isEmpty(this.ruleForm.email)) {
        let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (!this.ruleForm.email.match(pattern)) {
          this.ruleForm.email = "";
          this.$alert(this.$t("ipos.error_email"), "Error", {
            confirmButtonText: "OK",
            customClass: "ipos"
          })
            .then(() => {})
            .catch(() => {});
        }
      }
    },
    //mobile validate
    changeMobile() {
      if (this.ruleForm.mobileNo != "") {
        this.sendCodeDisabled = false;
        let pattern = /^07\d{8}/g;
        if (!this.ruleForm.mobileNo.match(pattern)) {
          this.ruleForm.mobileNo = "";
          this.$alert(this.$t("ipos.error_mobile"), "Error", {
            confirmButtonText: "OK",
            customClass: "ipos"
          })
            .then(() => {
              this.sendCodeDisabled = true;
            })
            .catch(() => {});
        }
      } else {
        return;
      }
    },
    changeVerificationCode() {},
    sendCode() {
      if (this.$store.state.networkStatus == 1) {
        this.sendCodeDisabled = true;
        let second = 60;
        this.sendCodeBtnText = second + "(S)";
        let timer = null;
        timer = setInterval(() => {
          second -= 1;
          if (second > 0) {
            this.sendCodeDisabled = true;
            this.sendCodeBtnText = second + "(S)";
          } else {
            clearInterval(timer);
            this.sendCodeDisabled = false;
            this.sendCodeBtnText = "SEND CODE";
          }
        }, 1000);
      } else {
        this.$alert(this.$t("ipos.send_code_tips"), "Error", {
          confirmButtonText: "OK",
          customClass: "ipos"
        })
          .then(() => {})
          .catch(() => {});
      }
    },
    //form validate
    validate() {
      this.$refs.customerForm.validate(valid => {
        if (valid) {
          this.saveDisable = false;
        } else {
          this.saveDisable = true;
        }
      });
    },
    //back
    cancel() {
      this.$router.replace({
        name: "customer details",
        query: {
          prospectId: this.$router.currentRoute.query.prospectId
        }
      });
    },
    //change gender according to tile
    changeGender(title) {
      let genderCode = util.checkGender(title);
      this.genderList.forEach(item => {
        if (item.code == genderCode) {
          this.ruleForm.gender = item;
        }
      });
      this.validateGender();
      this.validate();
    },
    //save image
    save() {
      let getImageArr = [];
      if (this.avatarImageUrl != "" && this.avatarChange == true) {
        getImageArr.push("avatar");
      }
      if (this.imageUrl != "" && this.businessChange == true) {
        getImageArr.push("img");
      }
      if (getImageArr.length > 0) {
        let _this = this;
        for (let i = 0; i < getImageArr.length; i++) {
          let isNeedSave = false;
          if (i === getImageArr.length - 1) {
            isNeedSave = true;
          }
          (function(type, flag) {
            _this.saveImage(type, flag);
          })(getImageArr[i], isNeedSave);
        }
      } else {
        this.saveData();
      }
    },
    //save data
    saveData() {
      this.ruleForm.prospectId = this.$router.currentRoute.query.prospectId;
      this.$store
        .dispatch("prospect/UPDATE_CUSTOMER_DETAIL", this.ruleForm)
        .then(res => {
          if (res.code == "0") {
            this.$store.commit(
              "prospect/UPDATE_CUSTOMER_DETAIL",
              this.ruleForm
            );
            this.$router.replace({
              name: "customer details",
              query: {
                prospectId: this.$router.currentRoute.query.prospectId
              }
            });
          }
        });
    },
    /**
     * upload success
     * @param {*} res
     * @param {*} file
     */
    handleAvatarSuccess(param) {
      let uploadType = param.type;
      let imageId = "";
      if (uploadType == "avatar") {
        imageId = this.ruleForm.portrait;
        this.avatarChange = true;
      } else {
        imageId = this.ruleForm.businessCard;
        this.businessChange = true;
      }
      let avatarImageUrl = param.avatarImageUrl;
      if (uploadType == "avatar") {
        this.avatarImageUrl = avatarImageUrl;
      } else {
        this.imageUrl = avatarImageUrl;
      }
    },
    saveImage(uploadType, flag) {
      let imageId = "";
      let imageUrl = "";
      if (uploadType == "avatar") {
        imageId = this.ruleForm.portrait;
        imageUrl = this.avatarImageUrl;
      } else {
        imageId = this.ruleForm.businessCard;
        imageUrl = this.imageUrl;
      }
      let params = {
        id: imageId,
        base64Content: imageUrl
      };
      this.$store.dispatch("prospect/SAVE_IMAGE", params).then(res => {
        if (res.code == "0") {
          if (uploadType == "avatar") {
            this.ruleForm.portrait = res.data.id;
          } else {
            this.ruleForm.businessCard = res.data.id;
          }
          if (flag === true) {
            this.saveData();
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.card-8 {
  .el-upload,
  .el-upload-dragger {
    width: 100%;
  }
}
.edit-customer {
  .el-dialog__body {
    height: 90vh;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
  }
}
</style>
<style lang="scss" scoped>
.edit-form {
  height: 80vh;
}
.form-bottom {
  margin: 0 -8rem;
  padding: 2rem 8rem;
}

.btn-group {
  display: flex;
  justify-content: space-evenly;
}
.serchResultList {
  li {
    border-bottom: 1px solid #e4e4e4;
    line-height: 30px;
    list-style: none;
    cursor: pointer;
  }
}
.position-fixed {
  position: relative;
  left: -120px;
}
</style>