/*
wa.me/6289687537657
github: https://github.com/Phmiuuu
Instagram: https://instagram.com/basrenggood
ini wm gw cok jan di hapus
*/

import crypto from 'crypto'
import FormData from 'form-data'

export async function txt2img(apiKey = global.prodia) {
    const base = "https://api.prodia.com/v1";
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Prodia-Key": apiKey,
    };
    async function sendRequest({
        link,
        method,
        params
    }) {
        try {
            const url = new URL(`${base}${link}`);
            const options = {
                method: method,
                headers: headers,
            };
            if (method === "GET" && params) {
                Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
            } else if (params) {
                options.body = JSON.stringify(params);
            }
            const response = await fetch(url.toString(), options);
            const data = await response.json();
            if (!response.ok) {
                const errorMessages = {
                    400: "The provided parameters are invalid.",
                    401: "The provided API key is invalid.",
                    402: "The API key is not enabled.",
                };
                throw new Error(errorMessages[response.status] || "Failed to receive a valid response.");
            }
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    return {
        async generateImage(params) {
            return await sendRequest({
                link: "/sd/generate",
                method: "POST",
                params
            });
        },
        async transform(params) {
            return await sendRequest({
                link: "/sd/transform",
                method: "POST",
                params
            });
        },
        async inpainting(params) {
            return await sendRequest({
                link: "/sd/inpaint",
                method: "POST",
                params
            });
        },
        async controlNet(params) {
            return await sendRequest({
                link: "/sd/controlnet",
                method: "POST",
                params
            });
        },
        async generateImageSDXL(params) {
            return await sendRequest({
                link: "/sdxl/generate",
                method: "POST",
                params
            });
        },
        async transformSDXL(params) {
            return await sendRequest({
                link: "/sdxl/transform",
                method: "POST",
                params
            });
        },
        async inpaintingSDXL(params) {
            return await sendRequest({
                link: "/sdxl/inpaint",
                method: "POST",
                params
            });
        },
        async upscale(params) {
            return await sendRequest({
                link: "/upscale",
                method: "POST",
                params
            });
        },
        async faceSwap(params) {
            return await sendRequest({
                link: "/faceswap",
                method: "POST",
                params
            });
        },
        async faceRestore(params) {
            return await sendRequest({
                link: "/facerestore",
                method: "POST",
                params
            });
        },
        async getJob(jobId) {
            return await sendRequest({
                link: `/job/${jobId}`,
                method: "GET"
            });
        },
        async getModels() {
            return await sendRequest({
                link: "/sd/models",
                method: "GET"
            });
        },
        async getSDXLModels() {
            return await sendRequest({
                link: "/sdxl/models",
                method: "GET"
            });
        },
        async getSamplers() {
            return await sendRequest({
                link: "/sd/samplers",
                method: "GET"
            });
        },
        async getSDXLSamplers() {
            return await sendRequest({
                link: "/sdxl/samplers",
                method: "GET"
            });
        },
        async getLoras() {
            return await sendRequest({
                link: "/sd/loras",
                method: "GET"
            });
        },
        async getSDXLLoras() {
            return await sendRequest({
                link: "/sdxl/loras",
                method: "GET"
            });
        },
        async getEmbeddings() {
            return await sendRequest({
                link: "/sd/embeddings",
                method: "GET"
            });
        },
        async getSDXLEmbeddings() {
            return await sendRequest({
                link: "/sdxl/embeddings",
                method: "GET"
            });
        },
        async wait(job) {
            let res = job;
            while (res.status !== "succeeded") {
                await new Promise((resolve) => setTimeout(resolve, 250));
                if (res.status === "failed") throw new Error("Failed to generate image.");
                res = await sendRequest({
                    link: `/job/${job.job}`,
                    method: "GET"
                });
            }
            return res;
        },
    };
}

export async function imgToPrompt(buffer) {
    const randomBytes = crypto.randomBytes(5).toString("hex");
    const formData = new FormData();
    formData.append("image", buffer, `${randomBytes}.jpg`);
    const response = await fetch("https://www.videotok.app/api/free-image-to-prompt", {
        method: "POST",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
            Referer: "https://www.videotok.app/image-to-prompt"
        },
        body: formData
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const output = await response.json();
    return output?.choices?.[0]?.message?.content;
}