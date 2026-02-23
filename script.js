document.addEventListener('DOMContentLoaded', function() {
    // 1. 数据源配置：你可以直接把你 Notebook 里总结的词汇替换到这里
    // value 代表权重（字体大小），越高字越大
    let wordData = {
        station: [
            [cite_start]{ name: '快捷支付', value: 100 }, // [cite: 110]
            [cite_start]{ name: '扫码乘车', value: 80 },  // [cite: 36]
            [cite_start]{ name: '节省时间', value: 70 },  // [cite: 57]
            [cite_start]{ name: '无现金', value: 60 },    // [cite: 59]
            [cite_start]{ name: '人脸识别', value: 50 }   // [cite: 110]
        ],
        hospital: [
            [cite_start]{ name: '辅助诊断', value: 100 }, // [cite: 82]
            [cite_start]{ name: '医疗建议', value: 90 },  // [cite: 81]
            [cite_start]{ name: '专业人士确认', value: 80 }, // [cite: 82]
            { name: '提高效率', value: 60 }
        ],
        hawker: [
            [cite_start]{ name: '扫码点餐', value: 100 }, // [cite: 41]
            [cite_start]{ name: '缺少人情味', value: 85 }, // [cite: 44]
            { name: '方便', value: 70 },
            [cite_start]{ name: '怀念人工', value: 60 }   // [cite: 42, 44]
        ],
        community: [
            [cite_start]{ name: '年轻人教老人', value: 100 }, // [cite: 130]
            { name: '社区互助', value: 80 },
            [cite_start]{ name: '智能设备', value: 70 },      // [cite: 130]
            { name: '老龄化适应', value: 60 }
        ],
        school: [
            [cite_start]{ name: '教学辅助', value: 100 }, // [cite: 123]
            [cite_start]{ name: '节约成本', value: 80 },  // [cite: 123]
            [cite_start]{ name: '解答问题', value: 70 },  // [cite: 122]
            { name: '创新思路', value: 60 }
        ]
    };

    const locNames = {
        station: '🚆 车站',
        hospital: '🏥 医院',
        hawker: '🍜 小贩中心',
        community: '🏘️ 社区中心',
        school: '🏫 学校'
    };

    let currentLoc = null;
    let chartDom = document.getElementById('word-cloud-container');
    let myChart = echarts.init(chartDom);

    // 2. 渲染词云的函数
    function renderCloud(locKey) {
        if (!locKey || !wordData[locKey]) return;
        
        document.getElementById('cloud-title').innerText = `${locNames[locKey]} 的高频词云`;
        
        let option = {
            tooltip: { show: true },
            series: [{
                type: 'wordCloud',
                shape: 'circle',
                keepAspect: false,
                left: 'center',
                top: 'center',
                width: '100%',
                height: '100%',
                right: null,
                bottom: null,
                sizeRange: [14, 50], // 字体大小范围
                rotationRange: [-45, 45], // 字体旋转角度范围
                rotationStep: 45,
                gridSize: 8,
                drawOutOfBound: false,
                textStyle: {
                    color: function () {
                        // 随机生成好看的颜色
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    }
                },
                emphasis: {
                    focus: 'self',
                    textStyle: { textShadowBlur: 10, textShadowColor: '#333' }
                },
                data: wordData[locKey]
            }]
        };
        myChart.setOption(option);
    }

    // 3. 监听地图悬停事件
    const markers = document.querySelectorAll('.map-marker');
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            // 移除其他激活状态
            markers.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            currentLoc = this.getAttribute('data-loc');
            // 同步更新下方下拉菜单的选项
            document.getElementById('loc-select').value = currentLoc; 
            renderCloud(currentLoc);
        });
    });

    // 4. 监听“补充关键词”按钮点击
    document.getElementById('add-word-btn').addEventListener('click', function() {
        const targetLoc = document.getElementById('loc-select').value;
        const inputEl = document.getElementById('new-word-input');
        const newWord = inputEl.value.trim();

        if (newWord !== '') {
            // 将新词加入数组，赋予较高的初始权重让它在词云中显眼
            wordData[targetLoc].push({ name: newWord, value: 95 });
            
            // 如果添加的就是当前正在浏览的地点，立即重新渲染词云
            if (currentLoc === targetLoc) {
                renderCloud(targetLoc);
            }

            // 清空输入框并显示成功提示
            inputEl.value = '';
            const msg = document.getElementById('success-msg');
            msg.classList.remove('hidden');
            setTimeout(() => { msg.classList.add('hidden'); }, 3000);
        } else {
            alert('请先输入关键词内容！');
        }
    });

    // 监听窗口缩放，自适应图表
    window.addEventListener('resize', function() {
        myChart.resize();
    });
});
