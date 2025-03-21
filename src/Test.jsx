import React, { useState, useEffect, useRef } from 'react';
import { Layout, Input, List, Avatar, Collapse, Modal, Button, message as messageC } from 'antd';
import {
    LoadingOutlined,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';  // 引入KaTeX样式 
import 'highlight.js/styles/github.css';
// import dayjs from 'dayjs';
import './Test.css';

const { Header, Content } = Layout;
const { TextArea } = Input;

const token = 'bce-v3/ALTAK-2gduWCfT0lZTE5OmjerYa/bf30b84c087037a0d0d600a567a267c7cf8073d2;ZjkyZmQ2YmQxZTQ3NDcyNjk0ZTg1ZjYyYjlkZjNjODB8AAAAABMCAAD7yeQtrdpAJVkGTxdN6tEXeFWEfai9h0TGTFuu52Rt0Bwj0HR/T8gsRxk3DhYjDWpIfVcD7aK7VTIHuwz/3bG9Fc7/891SVHfgYD5FSo0XJXJ4f6Ht4ERUz1AHoHS6wQCQWZIUBncP2Q0T0nxcPddPkc39NrKS3eq57t917nT5tMoBFjv2kAxOitYhBVACzqiPMT7IfyGzuF4PgRilKCccEsbzSvl1mhx7OJ8xB5NhQyqaAkiWx/LszmcvUZx3EszDkyGZr8NNdG7VZFbE2Qx+lNPTkQVGIqdaGe2bG5sF2ZkBSCxiUDCXEPXlUh6nZHWinqx6TDJPyGptVvZpOXlXuTKX/UJdkfPJ3EGw7gDI3ttU/h1BY8SPP29/q4fExR735EEvTk1BOM6QKrKHg1FRzUqkwzLzSh8NOL6lKAAoh89CNFIKwhdw9R4pDBLsrNk='

const ZanSvg = () => (<svg t="1741880116102" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13518" width="22" height="22"><path d="M604.2 205.9c16.2 8.4 30.4 22.7 42.8 41.5 20.1 31.1 32.4 75.8 35 126.3 1.9 40.8-2.6 82.9-13 119.8h154.2c36.3 0 67.4 9.1 90.7 25.9 24 17.5 37.6 42.8 38.2 70.6v0.6c0 21.4-8.4 47.3-20.7 64.1 13.6 15.5 20.7 36.3 20.7 61.5 0 29.8-20.7 57.7-41.5 72.5 5.2 11.7 7.1 25.3 7.1 34.3 0 33.7-20.1 60.2-55.1 74.5 3.2 7.8 4.5 16.2 4.5 26.6 0 31.7-13 57.7-37.6 74.5-24 16.8-58.3 25.3-101.7 25.3h-246c-27.2 0-57.7-5.8-80.3-14.9-9.1-3.9-17.5-7.8-23.3-11-1.3-0.6-3.2-1.3-4.5-1.9-1.3 0.6-1.9 1.9-3.2 2.6-1.9 1.3-3.9 3.2-5.8 4.5-14.3 10.4-29.8 20.1-48.6 20.7h-66.7c-28.5 0-51.8-9.1-68-26.6-14.9-16.2-24-39.5-25.9-68.7l-30.4-324.5v-1.3c0-30.4 9.1-57.6 25.9-77.7 17.5-20.7 42.1-31.7 69.3-31.7H338c16.2 0 42.8-5.2 77.1-30.4 24-18.1 38.9-36.3 42.1-42.1 11-26.6 21.4-55.7 21.4-125 0-8.4 0-34.3 11-57 9.1-20.1 29.8-43.4 72.6-43.4 14.8 0 28.4 3.9 42 10.4z" fill="#2c2c2c" p-id="13519"></path><path d="M616.7 144.2a2.3 12.2 0 1 0 4.6 0 2.3 12.2 0 1 0-4.6 0Z" fill="#2c2c2c" p-id="13520"></path><path d="M627.571704 142.656012a12.2 2.3 60 1 0 3.983717-2.3 12.2 2.3 60 1 0-3.983717 2.3Z" fill="#2c2c2c" p-id="13521"></path><path d="M636.311797 135.919689a12.2 2.3 30 1 0 2.3-3.983717 12.2 2.3 30 1 0-2.3 3.983717Z" fill="#2c2c2c" p-id="13522"></path><path d="M628.3 123.4a12.2 2.3 0 1 0 24.4 0 12.2 2.3 0 1 0-24.4 0Z" fill="#2c2c2c" p-id="13523"></path><path d="M627.328131 118.880268a2.3 12.2 60 1 0 21.13102-12.2 2.3 12.2 60 1 0-21.13102 12.2Z" fill="#2c2c2c" p-id="13524"></path><path d="M624.189866 115.445957a2.3 12.2 30 1 0 12.2-21.131019 2.3 12.2 30 1 0-12.2 21.131019Z" fill="#2c2c2c" p-id="13525"></path><path d="M617.4 101.9a2.3 12.2 0 1 0 4.6 0 2.3 12.2 0 1 0-4.6 0Z" fill="#2c2c2c" p-id="13526"></path><path d="M607.088802 105.649823a12.2 2.3 60 1 0 3.983717-2.3 12.2 2.3 60 1 0-3.983717 2.3Z" fill="#2c2c2c" p-id="13527"></path><path d="M600.042483 114.130839a12.2 2.3 30 1 0 2.3-3.983717 12.2 2.3 30 1 0-2.3 3.983717Z" fill="#2c2c2c" p-id="13528"></path><path d="M586 122.6a12.2 2.3 0 1 0 24.4 0 12.2 2.3 0 1 0-24.4 0Z" fill="#2c2c2c" p-id="13529"></path><path d="M590.235205 139.41267a2.3 12.2 60 1 0 21.13102-12.2 2.3 12.2 60 1 0-21.13102 12.2Z" fill="#2c2c2c" p-id="13530"></path><path d="M602.351017 151.801873a2.3 12.2 30 1 0 12.2-21.131019 2.3 12.2 30 1 0-12.2 21.131019Z" fill="#2c2c2c" p-id="13531"></path><path d="M367.4 187.6m-14.8 0a14.8 14.8 0 1 0 29.6 0 14.8 14.8 0 1 0-29.6 0Z" fill="#2c2c2c" p-id="13532"></path><path d="M737.5 164.8c2.3 0 4.2 1.9 4.2 4.2v45.5c0 2.3-1.9 4.2-4.2 4.2s-4.2-1.9-4.2-4.2V169c0-2.4 1.9-4.2 4.2-4.2z" fill="#2c2c2c" p-id="13533"></path><path d="M714.7 187.5h45.5c2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2h-45.5c-2.3 0-4.2-1.9-4.2-4.2 0.1-2.4 1.9-4.2 4.2-4.2z" fill="#2c2c2c" p-id="13534"></path><path d="M270.2 222.6c5.9-3 8.8-9 6.6-13.3l-43.4-84.1c-2.2-4.3-8.8-5.3-14.7-2.3-5.9 3-8.8 9-6.6 13.3l43.4 84.1c2.2 4.3 8.8 5.3 14.7 2.3z" fill="#2c2c2c" p-id="13535"></path><path d="M294.3 147c-3-5.9-9-8.8-13.3-6.6l-84.1 43.4c-4.3 2.2-5.3 8.8-2.3 14.7s9 8.8 13.3 6.6l84.1-43.4c4.3-2.2 5.3-8.8 2.3-14.7z" fill="#2c2c2c" p-id="13536"></path><path d="M442.8 8.2c20.8 0 37.7 16.8 37.7 37.4S463.6 83 442.8 83c-20.8 0-37.7-16.8-37.7-37.4S422 8.2 442.8 8.2z m0 64.8c15.3 0 27.8-12.3 27.8-27.5S458.1 18 442.8 18 415 30.3 415 45.5 427.5 73 442.8 73z" fill="#2c2c2c" p-id="13537"></path><path d="M674 1006.1h-81.3c-8.3 0-15-6.7-15-15s6.7-15 15-15H674c40.5 0 71.8-7.6 93.1-22.5l0.2-0.1c20.3-13.9 31-35.4 31-62.1 0-8.8-1-15.2-3.4-20.8l-5.8-14 14-5.7c29.5-12 45.7-33.5 45.7-60.6 0-7-1.5-18.6-5.8-28.2l-5-11.2 9.9-7.1c17.5-12.6 35.2-36.1 35.2-60.4 0-21.4-5.7-38.8-17-51.7l-7.9-9 7.1-9.7c10.5-14.4 17.8-37.1 17.8-55.3v-0.5c-0.6-23.2-12-44-32.1-58.7-20.8-15.1-49.2-23-81.8-23h-174l5.3-19.1c9.9-35.1 14.3-76 12.4-115.1-2.5-47.9-14-90.1-32.6-118.9-11.1-17-23.5-29.2-36.8-36.2-12.7-6-23.9-8.8-35.4-8.8-35.8 0-51.8 18.8-58.9 34.6l-0.2 0.4c-9.5 19.6-9.5 42.8-9.5 50.5 0 70.6-10.7 102.1-22.5 130.8l-0.3 0.8-0.4 0.7c-4.4 7.9-20.8 27.6-46.2 46.8l-0.2 0.1c-37.5 27.6-67.4 33.4-86 33.4H166.2c-22.9 0-43.5 9.4-57.8 26.4C93.8 519.3 86 542.9 86 570v0.6l3.5 37.7c0.8 8.2-5.3 15.6-13.5 16.3-8.2 0.8-15.6-5.3-16.3-13.5L56 572v-2c0-34.2 10.2-64.4 29.4-87.4 20.2-23.9 48.9-37.1 80.8-37.1h117.9c14 0 37.2-4.8 68.1-27.5 21.4-16.2 34.6-32.1 37.6-36.8 10.9-26.4 19.8-53.9 19.8-118.3 0-9.3 0-37.6 12.4-63.4 6.5-14.2 16.3-26.3 28.5-35.1 15.7-11.3 35.1-17 57.6-17 16 0 31.8 3.9 48.6 11.8l0.5 0.2c18 9.4 34.3 25 48.4 46.5 21.4 33.5 34.7 81 37.4 134.1 1.7 35.4-1.4 72.2-8.7 105.6h135c39 0 73.4 9.9 99.5 28.8 27.9 20.4 43.7 49.6 44.4 82.4v1c0 20.6-6.8 44.7-17.4 63.4 11.6 17.1 17.4 38 17.4 62.3 0 32.2-19.3 60.3-38.7 77.5 4 13.5 4.4 25.4 4.4 29.4 0 35.3-18.8 64.9-52.1 82.6 1.1 5.6 1.6 11.7 1.6 18.4 0 36.5-15.6 67.4-44 86.8-26.6 18.5-63.7 27.9-110.4 27.9z" fill="#2c2c2c" p-id="13538"></path><path d="M91.7 808.1c-7.7 0-14.2-5.8-14.9-13.6l-12-128.4c-0.8-8.2 5.3-15.6 13.5-16.3 8.3-0.8 15.6 5.3 16.3 13.5l12 128.4c0.8 8.2-5.3 15.6-13.5 16.3-0.4 0.1-0.9 0.1-1.4 0.1z" fill="#2c2c2c" p-id="13539"></path><path d="M502.1 1006.1h-74.2c-28.8 0-60.9-6-85.9-16l-0.3-0.1c-8-3.4-14.7-6.5-19.9-9.2-0.7 0.6-1.6 1.2-2.5 1.8-16.2 11.7-34.2 22.7-56.7 23.4h-67.2c-32.7 0-60-10.8-79-31.4-17.4-18.9-27.7-45.7-29.9-77.7L82.7 857c-0.8-8.2 5.3-15.6 13.5-16.3 8.2-0.8 15.6 5.3 16.3 13.5l3.8 40.7c1.7 25.1 9.3 45.7 22 59.5 13.3 14.4 32.5 21.7 57 21.7h66.4c13.6-0.5 25.8-7.5 40-17.9l0.5-0.4c0.3-0.2 1.1-0.8 1.6-1.3 1.1-0.9 2.4-2 3.9-3 1-1 2.7-2.5 5.1-3.7l6.7-3.4 6.7 3.4c0.3 0.1 0.7 0.3 1.1 0.5 1 0.4 2.2 0.9 3.4 1.5l0.6 0.3c4.8 2.7 12.3 6.2 21.8 10.3 21.3 8.5 49.9 13.8 74.6 13.8h74.2c8.3 0 15 6.7 15 15s-6.5 14.9-14.8 14.9z" fill="#2c2c2c" p-id="13540"></path><path d="M320.7 970c-7.9 0-14.5-6.2-15-14.2l-26.5-495c-0.4-8.3 5.9-15.3 14.2-15.8 8.3-0.4 15.3 5.9 15.8 14.2l26.5 495c0.4 8.3-5.9 15.3-14.2 15.8h-0.8z" fill="#2c2c2c" p-id="13541"></path><path d="M188.4 628.7c-7.9 0-14.5-6.2-15-14.2l-2.8-49.5c-0.5-8.3 5.9-15.3 14.1-15.8 8.3-0.5 15.3 5.9 15.8 14.1l2.8 49.5c0.5 8.3-5.9 15.3-14.1 15.8-0.3 0.1-0.5 0.1-0.8 0.1zM200.2 842.3c-7.9 0-14.5-6.2-15-14.2l-8.1-145.7c-0.5-8.3 5.9-15.3 14.1-15.8 8.3-0.5 15.3 5.9 15.8 14.1l8.1 145.7c0.5 8.3-5.9 15.3-14.1 15.8-0.2 0-0.5 0.1-0.8 0.1z" fill="#2c2c2c" p-id="13542"></path></svg>)

const CancelSvg = () => (<svg t="1741882059389" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19544" width="32" height="32"><path d="M512 928.3c-229.2 0-415-185.8-415-415s185.8-415 415-415 415 185.8 415 415-185.8 415-415 415z m0.4-77.5c186.2 0 337.2-151 337.2-337.2s-151-337.2-337.2-337.2-337.2 151-337.2 337.2 150.9 337.2 337.2 337.2zM382.3 357.6h259.4c14.3 0 25.9 11.6 25.9 25.9V643c0 14.3-11.6 25.9-25.9 25.9H382.3c-14.3 0-25.9-11.6-25.9-25.9V383.6c0-14.4 11.6-26 25.9-26z" p-id="19545"></path></svg>)

const SendSvg = () => (<svg t="1741878968290" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15096" width="32" height="32"><path d="M233.984 489.472l131.072 92.672c13.824 9.728 32.768 8.192 44.544-3.584l188.416-188.416c9.728-9.728 26.112-9.728 35.84 0 9.728 9.728 9.728 26.112 0 35.84L445.44 614.4c-11.776 11.776-13.824 30.72-3.584 44.544l92.672 131.072c32.768 46.592 104.448 35.84 122.368-18.432l158.208-475.136c17.92-54.272-33.792-105.984-88.064-88.064l-474.624 158.72c-54.272 17.92-64.512 89.6-18.432 122.368z" fill="#2c2c2c" p-id="15097"></path></svg>);

const DeepseekSvg = () => (<svg t="1741527216793" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="23955" width="32" height="32"><path d="M511.971842 512.028158m-511.971842 0a511.971842 511.971842 0 1 0 1023.943683 0 511.971842 511.971842 0 1 0-1023.943683 0Z" fill="#FFFFFF" p-id="23956"></path><path d="M81.915495 424.992945a436.858259 436.858259 0 0 0 101.955535 377.469525 635.869027 635.869027 0 0 1 48.564186-226.730387A641.646995 641.646995 0 0 1 81.915495 424.992945zM603.395385 694.875245a637.258665 637.258665 0 0 1-307.768216-78.843664A563.53472 563.53472 0 0 0 255.985921 822.868205c0 15.724849 1.097083 31.230282 2.413581 46.589438A435.322343 435.322343 0 0 0 511.971842 950.861165c75.333 0 146.20453-19.089236 208.226261-52.65996A569.82466 569.82466 0 0 0 731.388345 786.298788c0-35.179779-3.656942-69.408754-9.800604-102.760063A641.793273 641.793273 0 0 1 603.395385 694.875245z" fill="#53AEFF" p-id="23957"></path><path d="M869.401326 258.455819a544.152929 544.152929 0 0 0-46.589438-2.413581 563.169026 563.169026 0 0 0-234.629381 51.4166 639.818524 639.818524 0 0 1 187.162278 287.362481 566.825967 566.825967 0 0 0 174.948092-92.666903 435.176065 435.176065 0 0 0-80.891551-243.698597zM802.406153 183.927347a436.053731 436.053731 0 0 0-543.348401-29.913783 636.454138 636.454138 0 0 1 265.274553 102.979479 635.942166 635.942166 0 0 1 278.073848-73.065696z" fill="#A3D4FF" p-id="23958"></path><path d="M804.52718 786.298788c0 18.357847-1.24336 36.42314-2.779276 54.342154a438.247896 438.247896 0 0 0 140.57284-243.698597 637.039249 637.039249 0 0 1-149.495778 69.335615c7.460161 38.982999 11.702214 78.989941 11.702214 120.020828z" fill="#53AEFF" p-id="23959"></path><path d="M326.784313 549.182686A563.169026 563.169026 0 0 0 603.395385 621.73641c34.302113 0 67.7997-3.583803 100.346481-9.434909A568.069328 568.069328 0 0 0 519.285725 344.97906a570.775464 570.775464 0 0 0-192.501412 204.203626z" fill="#A3D4FF" p-id="23960"></path><path d="M1022.700323 537.699889z" fill="#1993FF" opacity=".4" p-id="23961"></path><path d="M265.493969 508.883189a641.427579 641.427579 0 0 1 188.91761-208.811373 562.730193 562.730193 0 0 0-269.516605-79.648191 438.759868 438.759868 0 0 0-73.870223 114.169721A568.288744 568.288744 0 0 0 265.493969 508.883189z" fill="#A3D4FF" p-id="23962"></path><path d="M1022.700323 537.699889C1023.066017 529.142646 1023.943683 520.73168 1023.943683 512.028158a529.086329 529.086329 0 0 0-5.704829-72.188029 506.559568 506.559568 0 0 0-52.7331-164.781794v-0.073139a499.318823 499.318823 0 0 0-25.891147-44.029579l-0.146278-0.219416a515.116811 515.116811 0 0 0-107.221531-117.680385c-3.071831-2.48672-6.436217-4.754024-9.654326-7.167606a526.745886 526.745886 0 0 0-33.27817-23.623843c-4.680885-2.998692-9.508048-5.777968-14.335212-8.703521a534.279186 534.279186 0 0 0-31.742254-17.699598c-5.704829-2.852415-11.409658-5.558551-17.114487-8.264689a438.101619 438.101619 0 0 0-31.888532-13.457545c-6.216801-2.340443-12.433602-4.754024-18.79668-6.948189a564.266108 564.266108 0 0 0-33.351309-9.800604C635.576472 15.708027 629.213393 13.879557 622.630898 12.41678a476.792062 476.792062 0 0 0-37.00825-6.436218c-5.851107-0.877666-11.629075-1.974749-17.480182-2.632998A491.858662 491.858662 0 0 0 460.043269 2.689315c-9.215493 0.877666-18.138431 2.706137-27.134508 4.095775-7.752716 1.24336-15.651711 1.974749-23.258149 3.583803-12.360463 2.48672-24.355232 5.851107-36.350001 9.215493-4.022636 1.170221-8.118411 1.90161-12.067907 3.14497-14.335212 4.38833-28.304729 9.581187-41.981691 15.139738l-4.461469 1.609055a547.80987 547.80987 0 0 0-43.883301 20.844568L270.613688 60.542133a517.09156 517.09156 0 0 0-151.689943 123.60463l-0.292555 0.365695c-10.970825 13.018713-21.210262 26.622536-30.79145 40.73833v0.073139c-5.63169 8.264688-10.531992 16.96821-15.65171 25.525453a511.825564 511.825564 0 0 0-53.97646 127.554128l-1.389638 5.412274c-3.071831 11.848491-5.851107 23.84326-8.118411 35.984306-1.023944 5.558551-1.682193 11.190242-2.559859 16.748793-1.389638 9.215493-2.852415 18.357847-3.73008 27.64648C0.950805 479.993349 0 495.937615 0 512.028158c0 19.016097 1.170221 37.6665 3.218109 56.097487 0.65825 5.924246 1.828471 11.702214 2.632998 17.480181 1.755332 12.433602 3.803219 24.867204 6.436217 37.081389 1.462777 6.582495 3.291248 12.945574 4.973441 19.45493 2.998692 11.263381 6.143662 22.453622 9.800604 33.351309 2.194165 6.28994 4.607747 12.506741 6.948189 18.79668a514.019729 514.019729 0 0 0 39.421832 80.745273c2.852415 4.827163 5.63169 9.654326 8.703521 14.335212 7.387022 11.409658 15.359155 22.453622 23.623844 33.27817 2.413582 3.14497 4.680885 6.509356 7.167605 9.654326 22.746178 28.304729 48.34477 54.195876 76.503221 77.088331 13.238129 10.67827 26.915091 20.771429 41.177164 30.1332l0.219417 0.146278a508.534316 508.534316 0 0 0 95.080485 48.92988c3.437525 1.389638 6.948189 2.559859 10.385714 3.803219 14.188934 5.192857 28.597284 9.727465 43.371329 13.676963l15.0666 3.876358c13.969517 3.291248 28.23159 5.851107 42.63994 7.972133 5.192857 0.731388 10.385714 1.755332 15.651711 2.413581 19.381791 2.267304 38.982999 3.656942 58.949901 3.656942 16.529377 0 32.766198-0.950805 48.856741-2.413582 11.043964-1.097083 21.868512-2.852415 32.766198-4.680885 4.315191-0.65825 8.77666-1.24336 13.091851-2.047887a558.049307 558.049307 0 0 0 41.396581-9.727465l2.194165-0.511972a510.143371 510.143371 0 0 0 133.62465-59.242456 514.166007 514.166007 0 0 0 167.780487-171.729984 512.118119 512.118119 0 0 0 71.017808-235.94588zM511.971842 73.195151c111.463584 0 212.907147 42.127969 290.434311 110.732196a635.869027 635.869027 0 0 0-278.146987 73.138834 636.673554 636.673554 0 0 0-265.201414-103.052617A436.053731 436.053731 0 0 1 511.971842 73.195151z m191.843162 539.10635c-32.61992 5.851107-66.117506 9.43491-100.419619 9.434909a563.169026 563.169026 0 0 1-276.611072-72.553724 570.482909 570.482909 0 0 1 192.574551-204.276764 568.654438 568.654438 0 0 1 184.45614 267.395579zM184.894974 220.496764a561.413694 561.413694 0 0 1 269.516605 79.648191A642.744078 642.744078 0 0 0 265.493969 508.883189a569.385827 569.385827 0 0 1-154.469218-174.362982 437.955341 437.955341 0 0 1 73.870223-114.023443z m-1.023944 581.965706A436.858259 436.858259 0 0 1 81.915495 424.919807a644.718826 644.718826 0 0 0 150.519721 150.812276 637.112387 637.112387 0 0 0-48.564186 226.730387z m536.327073 95.738735A435.980592 435.980592 0 0 1 511.971842 950.861165a435.322343 435.322343 0 0 1-253.57234-81.403522 544.152929 544.152929 0 0 1-2.413581-46.589438c0-73.065696 14.40835-142.693866 39.641248-206.836624a637.478082 637.478082 0 0 0 425.960572 67.507144c6.143662 33.351309 9.800604 67.580283 9.800604 102.760063 0 38.324749-3.949497 75.698694-11.190242 111.902417z m55.146682-303.306747a640.403635 640.403635 0 0 0-187.162278-287.43562A563.169026 563.169026 0 0 1 822.811888 256.042238c15.724849 0 31.230282 1.097083 46.589438 2.413581a436.12687 436.12687 0 0 1 80.891551 243.771736 565.948301 565.948301 0 0 1-174.948092 92.666903z m26.403119 245.746484c1.535916-17.919014 2.779276-35.984307 2.779276-54.342154 0-41.030886-4.242052-81.037829-11.629075-120.020828a635.503333 635.503333 0 0 0 149.495778-69.335615 437.882202 437.882202 0 0 1-140.645979 243.698597z" fill="#1993FF" p-id="23963"></path><path d="M292.555338 566.882284m-91.423543 0a91.423543 91.423543 0 1 0 182.847086 0 91.423543 91.423543 0 1 0-182.847086 0Z" fill="#FFFFFF" p-id="23964"></path><path d="M749.673054 640.021119m-91.423543 0a91.423543 91.423543 0 1 0 182.847086 0 91.423543 91.423543 0 1 0-182.847086 0Z" fill="#FFFFFF" p-id="23965"></path><path d="M511.971842 292.611655m-73.138835 0a73.138835 73.138835 0 1 0 146.277669 0 73.138835 73.138835 0 1 0-146.277669 0Z" fill="#FFFFFF" p-id="23966"></path></svg>)

const SeekSvg = () => (<svg t="1741879804021" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5005" width="18" height="18"><path d="M168.64 168.64C263.424 73.792 494.08 150.72 683.712 340.288c189.632 189.696 266.56 420.288 171.712 515.136-94.848 94.848-325.44 17.92-515.136-171.712C150.656 494.08 73.792 263.424 168.64 168.64z m469.824 216.96C470.592 217.728 275.2 152.576 213.888 213.888c-61.312 61.312 3.84 256.704 171.712 424.576 167.872 167.872 363.264 232.96 424.576 171.712 61.312-61.312-3.84-256.704-171.712-424.576z" fill="#808080" p-id="5006"></path><path d="M340.288 340.288C529.984 150.656 760.576 73.792 855.424 168.64c94.848 94.784 17.92 325.44-171.712 515.072S263.424 950.272 168.64 855.424C73.792 760.576 150.72 529.92 340.288 340.288z m469.888-126.4c-61.312-61.312-256.704 3.84-424.576 171.712C217.728 553.472 152.576 748.8 213.888 810.176c61.312 61.312 256.704-3.84 424.576-171.712 167.872-167.872 232.96-363.264 171.712-424.576z" fill="#808080" p-id="5007"></path><path d="M512 512m-69.376 0a69.376 69.376 0 1 0 138.752 0 69.376 69.376 0 1 0-138.752 0Z" fill="#808080" p-id="5008"></path></svg>)

const ChatInterface = () => {
    const [authCode, setAuthCode] = useState();
    const [submitLoading, setSubmitLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [controller, setController] = useState(null);
    const [activeKey, setActiveKey] = useState({})
    const [think, setThink] = useState({});
    const [message, setMessage] = useState([])
    const [fortune, setFortune] = useState({});
    const [input, setInput] = useState('');
    const [stopScroll, setStopScroll] = useState(false);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const thinkEndRef = useRef(null);
    const currentTimestampRef = useRef(null);
    const [isAbort, setIsAbort] = useState(false);
    const [messageApi, contextHolder] = messageC.useMessage();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        thinkEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // useEffect(() => {
    //     if (!stopScroll) {
    //         scrollToBottom();
    //     }
    // }, [think, fortune, stopScroll]);

    useEffect(() => {
        setOpen(true);
    }, []);

    useEffect(() => {
        let timeoutId;
        if (loading) {
            timeoutId = setTimeout(() => {
                if ((think[currentTimestampRef?.current] ?? '')?.length <= 0) {
                    if (controller) {
                        controller?.abort();
                        setFortune((pre) => ({ ...pre, [currentTimestampRef?.current]: '服务器繁忙！' }));
                    }
                }
            }, 3000);
        }

        return () => clearTimeout(timeoutId)
    }, [think, controller, loading])

    const streamDeepSeek = async (callback) => {
        setInput('');
        setLoading(true);
        const newController = new AbortController();
        setController(newController);

        try {
            const response = await fetch('https://qianfan.baidubce.com/v2/chat/completions', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'deepseek-r1',
                    prompt: input,
                    messages: [{ role: 'user', content: input }],
                    stream: true,
                }),
                signal: newController.signal
            });

            if (response.status !== 200) {
                setFortune((pre) => ({ ...pre, [currentTimestampRef?.current]: '服务器繁忙！' }));
                return;
            } else if (response.status === 200) {
                const reader = response?.body?.getReader();
                const decoder = new TextDecoder();

                while (true) {
                    const { done, value } = await reader?.read() ?? {};
                    if (done) {
                        setLoading(false)
                        break
                    };
                    const chunk = decoder.decode(value);
                    try {
                        const jsonStr = String(chunk).replace('data: ', '');
                        const parsed = JSON.parse(jsonStr);
                        callback(parsed.choices?.[0]?.delta?.reasoning_content, parsed.choices?.[0]?.delta?.content);
                    } catch (e) {
                        console.error('Chunk Analysis failed:', e);
                    }
                }
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.trim()) {
            const currentTimestamp = new Date().toISOString();
            currentTimestampRef.current = currentTimestamp;

            setStopScroll(false);
            setMessage((pre) => [...pre, { isBot: false, timestamp: currentTimestamp, text: input }, { isBot: true, timestamp: currentTimestamp, text: '' }]);
            setThink((pre) => ({ ...pre, [currentTimestamp]: '' }));
            setFortune((pre) => ({ ...pre, [currentTimestamp]: '' }));
            setActiveKey((pre) => ({ ...pre, [currentTimestamp]: '1' }))
            let fullResponse = '';
            let fullThink = ''

            await streamDeepSeek((think, text) => {
                if (think) {
                    fullThink += think
                    setThink((pre) => ({ ...pre, [currentTimestamp]: fullThink }));
                }

                if (text) {
                    fullResponse += text;
                    setFortune((pre) => ({ ...pre, [currentTimestamp]: fullResponse }));
                }

            }, false);

        }
    };

    const handleCancel = () => {
        if (controller) {
            try {
                controller.abort();
                setController(null);
                setIsAbort((pre) => ({ ...pre, [currentTimestampRef?.current]: '已停止回答' }));
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <Layout className="layout-container">
                <Header className="header">
                    <h1 style={{ color: '#333', margin: 0 }}>
                        {/* <Icon component={ZanSvg} /> */}
                        <span style={{ marginLeft: 4, userSelect: 'none' }}>QLeap</span>
                    </h1>
                </Header>

                <Content className="content">
                    <List
                        className='list'
                        bordered={false}
                        dataSource={message}
                        split={false}
                        locale={{
                            emptyText: <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, flexFlow: 'column' }}>
                                <div style={{ display: 'inline-flex', alignItems: 'center', color: '#333', fontSize: 18, fontWeight: 500 }}>
                                    QLeap-全识</div>
                                <span style={{ color: '#333' }}>我可以帮你搜索、答疑、推理、写作、提建议，请把你的想法告诉我吧。</span>
                            </div>
                        }}
                        renderItem={item => (
                            <List.Item
                                className={`message-item ${item.isBot ? 'bot' : 'user'}`}
                            >
                                <div className="message-container">
                                    {item.isBot && <Avatar
                                        size='large'
                                        style={{ backgroundColor: '#fff' }}
                                        icon={<Icon component={ZanSvg} />}
                                    />}
                                    <div className={`message-content ${item.isBot ? 'bot-content' : 'user-content'}`}>
                                        {
                                            item.isBot ?
                                                <>
                                                    <Collapse
                                                        activeKey={activeKey?.[item?.timestamp]}
                                                        onChange={(val) => setActiveKey((pre) => ({ ...pre, [item?.timestamp]: val?.[0] === '1' ? val : null }))}
                                                        bordered={false}
                                                        items={[{
                                                            key: '1', label: <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon style={{ width: 18, height: 18 }} component={SeekSvg} /><p className='think-title'>{fortune?.[item?.timestamp] ? '已深度思考' : '思考中:'}</p></div>, children:
                                                                <>
                                                                    {
                                                                        think?.[item?.timestamp] || fortune?.[item?.timestamp] ?
                                                                            <p className='think-text'>{think?.[item?.timestamp]}<div ref={thinkEndRef} /></p>
                                                                            : <LoadingOutlined />
                                                                    }
                                                                </>
                                                        }]}
                                                    />
                                                    {fortune?.[item?.timestamp] && <ReactMarkdown children={fortune?.[item?.timestamp]} remarkPlugins={[remarkMath, remarkGfm, rehypeHighlight]}
                                                        rehypePlugins={[rehypeKatex]}>
                                                        {/* {fortune?.[item?.timestamp]} */}
                                                    </ReactMarkdown>}
                                                    {isAbort[item?.timestamp] && <span style={{ display: 'inline-block', borderRadius: 5, padding: 3, marginTop: 4, backgroundColor: 'rgba(0, 0, 0, 0.08)' }}>{isAbort[item?.timestamp]}</span>}
                                                </> : <div className='user-question'>{item.text}</div>
                                        }
                                        {/* <div className={`timestamp ${item.isBot ? 'bot-timestamp' : 'user-timestamp'}`}>
                                        {dayjs(item.timestamp).format('HH:mm:ss')}
                                    </div> */}
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                    <div ref={messagesEndRef} />
                </Content>

                <div className="input-container">
                    <div className='input-content'>
                        <TextArea
                            className='input'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onPressEnter={(e) => { e.preventDefault(); handleSubmit(e); }}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            placeholder="输入任何问题"
                        />
                        <Icon style={{ width: 32, height: 32, marginBottom: 10 }} component={!loading ? SendSvg : CancelSvg} onClick={!loading ? handleSubmit : handleCancel} />
                    </div>
                </div>
            </Layout>
            <Modal
                centered
                closable={false}
                maskClosable={false}
                open={open}
                footer={<div><Button type='primary' loading={submitLoading} onClick={() => {
                    setSubmitLoading(true);
                    setTimeout(() => {
                        setSubmitLoading(false);
                        if (authCode === '595') {
                            messageApi.success('验证通过')
                            setOpen(false);
                        } else {
                            messageApi.error('验证令牌错误或已失效')
                        }
                    }, 1000)
                }}>Go</Button></div>}>
                内测令牌：<Input value={authCode} onChange={(e) => setAuthCode(e.target.value)} style={{ width: 120 }} />
            </Modal>
            {contextHolder}
        </>
    );
};

export default ChatInterface;