import { txt2img } from '../function/system/generate-img.js';

let handler = async (m, {
    conn,
    text,
    args,
    usedPrefix,
    command
}) => {
    let prodiaSet = db.data.prodia[m.sender] || (db.data.prodia[m.sender] = {});

    if (args[0] === 'model') {
        if (!args[1]) throw `*Example:* ${usedPrefix}${command} model numberModel\n\n *List Model:*\n[ 1 ]. 3Guofeng3_v34.safetensors [50f420de]
[ 2 ]. absolutereality_V16.
[ 3 ]. absolutereality_v181
[ 4 ]. amIReal_V41
[ 5 ]. analog-diffusion-1.0
[ 6 ]. aniverse_v30
[ 7 ]. anythingv3_0
[ 8 ]. anything-v4.5
[ 9 ]. anythingV5_PrtRE
[ 10 ]. AOM3A3_orangemixs
[ 11 ]. blazing_drive_v10g
[ 12 ]. breakdomain_I2428
[ 13 ]. breakdomain_M2150
[ 14 ]. cetusMix_Version35
[ 15 ]. childrensStories_v13D
[ 16 ]. childrensStories_v1SemiReal
[ 17 ]. childrensStories_v1ToonAnime
[ 18 ]. Counterfeit_v30
[ 19 ]. cuteyukimixAdorable_midchapter3
[ 20 ]. cyberrealistic_v33
[ 21 ]. dalcefo_v4
[ 22 ]. deliberate_v2
[ 23 ]. deliberate_v3
[ 24 ]. dreamlike-anime-1.0
[ 25 ]. dreamlike-diffusion-1.0
[ 26 ]. dreamlike-photoreal-2.0
[ 27 ]. dreamshaper_6BakedVae
[ 28 ]. dreamshaper_7
[ 29 ]. dreamshaper_8
[ 30 ]. edgeOfRealism_eorV20
[ 31 ]. EimisAnimeDiffusion_V1
[ 32 ]. elldreths-vivid-mix
[ 33 ]. epicphotogasm_xPlusPlus
[ 34 ]. epicrealism_naturalSinRC1VAE
[ 35 ]. epicrealism_pureEvolutionV3
[ 36 ]. ICantBelieveItsNotPhotography_seco
[ 37 ]. indigoFurryMix_v75Hybrid
[ 38 ]. juggernaut_aftermath
[ 39 ]. lofi_v4
[ 40 ]. lyriel_v16
[ 41 ]. majicmixRealistic_v4
[ 42 ]. mechamix_v10
[ 43 ]. meinamix_meinaV9
[ 44 ]. meinamix_meinaV11
[ 45 ]. neverendingDream_v122
[ 46 ]. openjourney_V4
[ 47 ]. pastelMixStylizedAnime_pruned_fp16
[ 48 ]. portraitplus_V1.0
[ 49 ]. protogenx34
[ 50 ]. Realistic_Vision_V1.4-pruned-fp16
[ 51 ]. Realistic_Vision_V2.0
[ 52 ]. Realistic_Vision_V4.0
[ 53 ]. Realistic_Vision_V5.0
[ 54 ]. Realistic_Vision_V5.1
[ 55 ]. redshift_diffusion-V10
[ 56 ]. revAnimated_v122
[ 57 ]. rundiffusionFX25D_v10
[ 58 ]. rundiffusionFX_v10
[ 59 ]. sdv1_4
[ 60 ]. v1-5-pruned-emaonly
[ 61 ]. v1-5-inpainting
[ 62 ]. shoninsBeautiful_v10
[ 63 ]. theallys-mix-ii-churned
[ 64 ]. timeless-1.0
[ 65 ]. toonyou_beta6`.trim()
        let models = [{
                "1": "3Guofeng3_v34.safetensors [50f420de]"
            },
            {
                "2": "absolutereality_V16.safetensors [37db0fc3]"
            },
            {
                "3": "absolutereality_v181.safetensors [3d9d4d2b]"
            },
            {
                "4": "amIReal_V41.safetensors [0a8a2e61]"
            },
            {
                "5": "analog-diffusion-1.0.ckpt [9ca13f02]"
            },
            {
                "6": "aniverse_v30.safetensors [579e6f85]"
            },
            {
                "7": "anythingv3_0-pruned.ckpt [2700c435]"
            },
            {
                "8": "anything-v4.5-pruned.ckpt [65745d25]"
            },
            {
                "9": "anythingV5_PrtRE.safetensors [893e49b9]"
            },
            {
                "10": "AOM3A3_orangemixs.safetensors [9600da17]"
            },
            {
                "11": "blazing_drive_v10g.safetensors [ca1c1eab]"
            },
            {
                "12": "breakdomain_I2428.safetensors [43cc7d2f]"
            },
            {
                "13": "breakdomain_M2150.safetensors [15f7afca]"
            },
            {
                "14": "cetusMix_Version35.safetensors [de2f2560]"
            },
            {
                "15": "childrensStories_v13D.safetensors [9dfaabcb]"
            },
            {
                "16": "childrensStories_v1SemiReal.safetensors [a1c56dbb]"
            },
            {
                "17": "childrensStories_v1ToonAnime.safetensors [2ec7b88b]"
            },
            {
                "18": "Counterfeit_v30.safetensors [9e2a8f19]"
            },
            {
                "19": "cuteyukimixAdorable_midchapter3.safetensors [04bdffe6]"
            },
            {
                "20": "cyberrealistic_v33.safetensors [82b0d085]"
            },
            {
                "21": "dalcefo_v4.safetensors [425952fe]"
            },
            {
                "22": "deliberate_v2.safetensors [10ec4b29]"
            },
            {
                "23": "deliberate_v3.safetensors [afd9d2d4]"
            },
            {
                "24": "dreamlike-anime-1.0.safetensors [4520e090]"
            },
            {
                "25": "dreamlike-diffusion-1.0.safetensors [5c9fd6e0]"
            },
            {
                "26": "dreamlike-photoreal-2.0.safetensors [fdcf65e7]"
            },
            {
                "27": "dreamshaper_6BakedVae.safetensors [114c8abb]"
            },
            {
                "28": "dreamshaper_7.safetensors [5cf5ae06]"
            },
            {
                "29": "dreamshaper_8.safetensors [9d40847d]"
            },
            {
                "30": "edgeOfRealism_eorV20.safetensors [3ed5de15]"
            },
            {
                "31": "EimisAnimeDiffusion_V1.ckpt [4f828a15]"
            },
            {
                "32": "elldreths-vivid-mix.safetensors [342d9d26]"
            },
            {
                "33": "epicphotogasm_xPlusPlus.safetensors [1a8f6d35]"
            },
            {
                "34": "epicrealism_naturalSinRC1VAE.safetensors [90a4c676]"
            },
            {
                "35": "epicrealism_pureEvolutionV3.safetensors [42c8440c]"
            },
            {
                "36": "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]"
            },
            {
                "37": "indigoFurryMix_v75Hybrid.safetensors [91208cbb]"
            },
            {
                "38": "juggernaut_aftermath.safetensors [5e20c455]"
            },
            {
                "39": "lofi_v4.safetensors [ccc204d6]"
            },
            {
                "40": "lyriel_v16.safetensors [68fceea2]"
            },
            {
                "41": "majicmixRealistic_v4.safetensors [29d0de58]"
            },
            {
                "42": "mechamix_v10.safetensors [ee685731]"
            },
            {
                "43": "meinamix_meinaV9.safetensors [2ec66ab0]"
            },
            {
                "44": "meinamix_meinaV11.safetensors [b56ce717]"
            },
            {
                "45": "neverendingDream_v122.safetensors [f964ceeb]"
            },
            {
                "46": "openjourney_V4.ckpt [ca2f377f]"
            },
            {
                "47": "pastelMixStylizedAnime_pruned_fp16.safetensors [793a26e8]"
            },
            {
                "48": "portraitplus_V1.0.safetensors [1400e684]"
            },
            {
                "49": "protogenx34.safetensors [5896f8d5]"
            },
            {
                "50": "Realistic_Vision_V1.4-pruned-fp16.safetensors [8d21810b]"
            },
            {
                "51": "Realistic_Vision_V2.0.safetensors [79587710]"
            },
            {
                "52": "Realistic_Vision_V4.0.safetensors [29a7afaa]"
            },
            {
                "53": "Realistic_Vision_V5.0.safetensors [614d1063]"
            },
            {
                "54": "Realistic_Vision_V5.1.safetensors [a0f13c83]"
            },
            {
                "55": "redshift_diffusion-V10.safetensors [1400e684]"
            },
            {
                "56": "revAnimated_v122.safetensors [3f4fefd9]"
            },
            {
                "57": "rundiffusionFX25D_v10.safetensors [cd12b0ee]"
            },
            {
                "58": "rundiffusionFX_v10.safetensors [cd4e694d]"
            },
            {
                "59": "sdv1_4.ckpt [7460a6fa]"
            },
            {
                "60": "v1-5-pruned-emaonly.safetensors [d7049739]"
            },
            {
                "61": "v1-5-inpainting.safetensors [21c7ab71]"
            },
            {
                "62": "shoninsBeautiful_v10.safetensors [25d8c546]"
            },
            {
                "63": "theallys-mix-ii-churned.safetensors [5d9225a4]"
            },
            {
                "64": "timeless-1.0.ckpt [7c4971d4]"
            },
            {
                "65": "toonyou_beta6.safetensors [980f6b15]"
            }
        ]
        let inputNumber = args[1]
        let modelName = models.find(obj => {
            for (const [key, value] of Object.entries(obj)) {
                if (key === inputNumber.toString()) {
                    return value;
                }
            }
        })?.[inputNumber.toString()];
        prodiaSet.model = modelName
        m.reply(`sukses mengatur model ${prodiaSet.model}`)
    } else if (args[0] === "lora") {
        if (!args[1]) throw `*Example:* ${usedPrefix}${command} lora numberLora\n\n*List Lora:*\n[ 1 ]. 0mib3_v10
[ 2 ]. 3DMM_V12
[ 3 ]. age_slider_v20
[ 4 ]. arcane_offset
[ 5 ]. AstralMecha
[ 6 ]. Drawing
[ 7 ]. epi_noiseoffset2
[ 8 ]. eye_size_slider_v1
[ 9 ]. FairyTaleV20_SD1.5
[ 10 ]. GrayClay_V1.5
[ 11 ]. hair_length_slider_v1
[ 12 ]. hipoly_3dcg_v20
[ 13 ]. linevichit3-v10
[ 14 ]. more_details_v10
[ 15 ]. muscle_slider_v1
[ 16 ]. room2
[ 17 ]. StealthMecha
[ 18 ]. weight_slider_v2
[ 19 ]. zoom_slider_v1`.trim()
        let lora = [{
                "1": "0mib3_v10"
            },
            {
                "2": "3DMM_V12"
            },
            {
                "3": "age_slider_v20"
            },
            {
                "4": "arcane_offset"
            },
            {
                "5": "AstralMecha"
            },
            {
                "6": "Drawing"
            },
            {
                "7": "epi_noiseoffset2"
            },
            {
                "8": "eye_size_slider_v1"
            },
            {
                "9": "FairyTaleV20_SD1.5"
            },
            {
                "10": "GrayClay_V1.5."
            },
            {
                "11": "hair_length_slider_v1"
            },
            {
                "12": "hipoly_3dcg_v20"
            },
            {
                "13": "linevichit3-v10"
            },
            {
                "14": "more_details_v10"
            },
            {
                "15": "muscle_slider_v1"
            },
            {
                "16": "room2"
            },
            {
                "17": "StealthMecha"
            },
            {
                "18": "weight_slider_v2"
            },
            {
                "19": "zoom_slider_v1"
            }
        ]
        let inputNumber = args[1]
        let loraName = lora.find(obj => {
            for (const [key, value] of Object.entries(obj)) {
                if (key === inputNumber.toString()) {
                    return value;
                }
            }
        })?.[inputNumber.toString()];
        prodiaSet.lora = loraName
        m.reply(`sukses mengatur model ${prodiaSet.lora}`)
    } else if (args[0] === "style") {
        if (!args[1]) throw `*Example:* ${usedPrefix}${command} style numberStyle\n\n*List Style:*\n[ 1 ]. 3d model
[ 2 ]. analog film
[ 3 ]. anime
[ 4 ]. cinematic
[ 5 ]. comic book
[ 6 ]. digital art
[ 7 ]. enhance
[ 8 ]. fantasy art
[ 9 ]. isometric
[ 10 ]. line art
[ 11 ]. low poly
[ 12 ]. neon punk
[ 13 ]. origami
[ 14 ]. photographic
[ 15 ]. pixel art
[ 16 ]. texture
[ 17 ]. craft clay`.trim()
        let style = [{
                "1": "3d-model"
            },
            {
                "2": "analog-film"
            },
            {
                "3": "anime"
            },
            {
                "4": "cinematic"
            },
            {
                "5": "comic-book"
            },
            {
                "6": "digital-art"
            },
            {
                "7": "enhance"
            },
            {
                "8": "fantasy-art"
            },
            {
                "9": "isometric"
            },
            {
                "10": "line-art"
            },
            {
                "11": "low-poly"
            },
            {
                "12": "neon-punk"
            },
            {
                "13": "origami"
            },
            {
                "14": "photographic"
            },
            {
                "15": "pixel-art"
            },
            {
                "16": "texture"
            },
            {
                "17": "craft-clay"
            }
        ]
        let inputNumber = args[1]
        let styleName = style.find(obj => {
            for (const [key, value] of Object.entries(obj)) {
                if (key === inputNumber.toString()) {
                    return value;
                }
            }
        })?.[inputNumber.toString()];
        prodiaSet.style = styleName
        m.reply(`sukses mengatur model ${prodiaSet.style}`)
    } else if (args[0] === "sampler") {
        if (!args[1]) throw `*Example:* ${usedPrefix}${command} sampler numberSampler\n\n*List Sampler:*\n[ 1 ]. DPM++ 2M Karras
[ 2 ]. DPM++ SDE Karras
[ 3 ]. DPM++ 2M SDE Exponential
[ 4 ]. DPM++ 2M SDE Karras
[ 5 ]. Euler a
[ 6 ]. Euler
[ 7 ]. LMS
[ 8 ]. Heun
[ 9 ]. DPM2
[ 10 ]. DPM2 a
[ 11 ]. DPM++ 2S a
[ 12 ]. DPM++ 2M
[ 13 ]. DPM++ SDE
[ 14 ]. DPM++ 2M SDE
[ 15 ]. DPM++ 2M SDE Heun
[ 16 ]. DPM++ 2M SDE Heun Karras
[ 17 ]. DPM++ 2M SDE Heun Exponential
[ 18 ]. DPM++ 3M SDE
[ 19 ]. DPM++ 3M SDE Karras
[ 20 ]. DPM++ 3M SDE Exponential
[ 21 ]. DPM fast
[ 22 ]. DPM adaptive
[ 23 ]. LMS Karras
[ 24 ]. DPM2 Karras
[ 25 ]. DPM2 a Karras
[ 26 ]. DPM++ 2S a Karras
[ 27 ]. Restart
[ 28 ]. DDIM
[ 29 ]. PLMS
[ 30 ]. UniPC`.trim()
        let sampler = [{
                "1": "DPM++ 2M Karras"
            },
            {
                "2": "DPM++ SDE Karras"
            },
            {
                "3": "DPM++ 2M SDE Exponential"
            },
            {
                "4": "DPM++ 2M SDE Karras"
            },
            {
                "5": "Euler a"
            },
            {
                "6": "Euler"
            },
            {
                "7": "LMS"
            },
            {
                "8": "Heun"
            },
            {
                "9": "DPM2"
            },
            {
                "10": "DPM2 a"
            },
            {
                "11": "DPM++ 2S a"
            },
            {
                "12": "DPM++ 2M"
            },
            {
                "13": "DPM++ SDE"
            },
            {
                "14": "DPM++ 2M SDE"
            },
            {
                "15": "DPM++ 2M SDE Heun"
            },
            {
                "16": "DPM++ 2M SDE Heun Karras"
            },
            {
                "17": "DPM++ 2M SDE Heun Exponential"
            },
            {
                "18": "DPM++ 3M SDE"
            },
            {
                "19": "DPM++ 3M SDE Karras"
            },
            {
                "20": "DPM++ 3M SDE Exponential"
            },
            {
                "21": "DPM fast"
            },
            {
                "22": "DPM adaptive"
            },
            {
                "23": "LMS Karras"
            },
            {
                "24": "DPM2 Karras"
            },
            {
                "25": "DPM2 a Karras"
            },
            {
                "26": "DPM++ 2S a Karras"
            },
            {
                "27": "Restart"
            },
            {
                "28": "DDIM"
            },
            {
                "29": "PLMS"
            },
            {
                "30": "UniPC"
            }
        ]
        let inputNumber = args[1]
        let samplerName = sampler.find(obj => {
            for (const [key, value] of Object.entries(obj)) {
                if (key === inputNumber.toString()) {
                    return value;
                }
            }
        })?.[inputNumber.toString()];
        prodiaSet.sampler = samplerName
        m.reply(`sukses mengatur model ${prodiaSet.sampler}`)
    } else if (args[0] === "ukuran") {
        if (!args[1] || !args[2]) throw `*Example:* ${usedPrefix}${command} ukuran width height`
        prodiaSet.width = parseInt(args[1])
        prodiaSet.height = parseInt(args[2])
        m.reply(`sukses mengatur ukuran ${prodiaSet.width} : ${prodiaSet.height}`)
    } else if (args[0] === "upscale") {
        if (!args[1]) throw `*Example:* ${usedPrefix}${command} upscale *on/off*`
        let sett = [{
                "on": "true"
            },
            {
                "off": "false"
            }
        ]
        let setting = args[1]
        let hasil = sett.find(obj => {
            for (const [key, value] of Object.entries(obj)) {
                if (key === setting.toString()) {
                    return value;
                }
            }
        })?.[setting.toString()];
        prodiaSet.upscale = hasil
        m.reply(`sukses setting upscale *${prodiaSet.upscale}*`)
    } else if (args[0] === "negative_prompt") {
        if (!text) throw `*Example:* ${usedPrefix}${command} negative_prompt *teks*`
        prodiaSet.negative = text
        m.reply(`sukses mengatur negative_prompt: *${prodiaSet.negative}*`)
    } else if (args[0] === "snowall") {
        let all = `*sampler:* ${prodiaSet.sampler}
*width:* ${prodiaSet.width}
*height:* ${prodiaSet.height}
*upscale:* ${prodiaSet.upscale}
*cfg_scale:* 7
*steps:* 25
*style_preset:* ${prodiaSet.style}
*negative_prompt:* ${prodiaSet.negative}
*model:* ${prodiaSet.model}
*loras:* ${prodiaSet.lora}
*embeddings:* Fastnegative-v2`.trim()
        m.reply(all)
    } else if (args[0] === "deletelora") {
        prodiaSet.lora = null
        m.reply("`s u k s e s`")
    } else {
        if (!text) throw `*Example:* ${usedPrefix}${command} *a girl*`
        conn.sendMessage(m.chat, {
            react: {
                text: '✨',
                key: m.key,
            }
        })
        let data = {
            sampler: prodiaSet.sampler,
            width: prodiaSet.width,
            height: prodiaSet.height,
            upscale: prodiaSet.upscale,
            cfg_scale: 7,
            steps: 25,
            style_preset: prodiaSet.style,
            negative_prompt: prodiaSet.negative,
            prompt: text,
            model: prodiaSet.model,
            loras: prodiaSet.lora,
            embeddings: "Fastnegative-v2"
        }
        try {
            let res = await (await scrape.Generate_Image.txt2img()).generateImage(data)
            let job = await (await scrape.Generate_Image.txt2img()).wait(res)
            const paramHd = {
                imageUrl: job.imageUrl,
                model: "R-ESRGAN 4x+ Anime6B",
                resize: 2
            };
            let hd = await (await scrape.Generate_Image.txt2img()).upscale(paramHd)
            let hasil = await (await scrape.Generate_Image.txt2img()).wait(hd)
            await conn.sendFile(m.chat, hasil.imageUrl, "", wm, m)
        } catch (e) {
            throw "`wait in progess before...`"
        }
    }
}
handler.help = ["animediff"]
handler.command = ['animediff', 'imgdiff']
handler.tags = ['ai']
handler.limit = true
handler.premium = false
export default handler