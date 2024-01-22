import toast from 'react-hot-toast';

export const notification = (message: string, position: string = 'top-center', type: number = 0) => {
    if (type === 0) {
        toast.error(message, {
            duration: 4000,
            // @ts-ignore
            position: position,
            className: 'toast-background toast-text',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        })
    }
    if (type === 1) {
        toast.success(message, {
            duration: 4000,
            // @ts-ignore
            position: position,
            className: 'toast-background toast-text',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        })
    }
    if (type === 2) {
        toast(message, {
            duration: 4000,
            // @ts-ignore
            position: position,
            className: 'toast-background toast-text',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        })
    }

    if (type === 3) {
        toast(
            (t: any) => (
                <span className='text-center cursor-pointer'>
                    <span onClick={
                        () => {
                            window.open('https://www.okx.com/en/web3', '_blank');
                            toast.dismiss()
                        }
                    }> Please donwload okx wallet first</span>
                </span>
            ),
            {
                duration: 2000000,
                icon: '😶‍🌫️',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    }
}